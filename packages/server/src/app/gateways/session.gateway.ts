import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from "socket.io";
import { BroadcastSession } from '../models/broadcast-session.model';
import { SessionService } from '../services/session/session.service';
import { PeerIdentityService } from '../services/peer-identity/peer-identity.service';
import { SocketIdentity, SocketIdentityService } from '../services/socket-identity/socket-identity.service';

@WebSocketGateway({ cors: true })
export class SessionGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(SessionGateway.name);
  @WebSocketServer() server: Server;
  constructor(private sessionService: SessionService, private socketIdentity: SocketIdentityService, private peerIdentity: PeerIdentityService) { }

  /**
   * Who a socket is comes from the credentials in its handshake, checked here before any message is handled. The
   * connection is never refused for a bad token: that client is an anonymous one (and is told, see handleConnection).
   */
  afterInit(server: Server): void {
    server.use((socket, next) => {
      try {
        socket.data.identity = this.socketIdentity.resolve(socket.handshake.auth);
        next();
      } catch (err) {
        this.logger.error(`cannot establish the identity of socket ${socket.id}: ${(err as Error).message}`);
        next(new Error('identity unavailable'));
      }
    });
  }

  // Gateway connection handler
  async handleConnection(client: Socket): Promise<void> {
    if ((client.data?.identity as SocketIdentity | undefined)?.authFailed) {
      client.send({message: 'auth failed'});
    }
    const userId = await this.sessionService.getUserIdForNewClientConnection(client.id);
    if (userId) {
      client.send({message: 'set user id', id: userId})
    }
  }
  
  // Gateway disconnect handler
  async handleDisconnect(client: Socket) {
    const broadcastRooms: BroadcastSession[] | null = await this.sessionService.handleClientDisconnected(client.id);
    if (broadcastRooms?.length) {
      broadcastRooms.forEach((session) => {
        client.broadcast.to(session.roomId).emit('message', { user: session.hostUserId, message: 'user left room', room: session.roomId });
      })
    }
  }
  
  @SubscribeMessage('refreshRooms')
  async handleRefreshRooms(client: Socket, payload: { userId: string }) {
    const clientUserId = await this.sessionService.getUserFromClientId(client.id);
    if (clientUserId === payload.userId) {
      const userRooms = await this.sessionService.findUserRooms(payload.userId);
      client.send({message: 'set rooms', rooms: userRooms });
    }
  }
  

  @SubscribeMessage('join')
  async handleJoin(client: Socket, payload: { room?: string, myBroadcast?: boolean, allowAnonymous?: boolean}): Promise<void> {
    console.log('join room', payload)
    const broadcast = await this.sessionService.getBroadcastSession(client.id, payload);
    if (!broadcast) {
      client.send({message: 'broadcast expired', expiredAt: -1 });
      return;
    }
    const isHosting = payload.myBroadcast && broadcast.hostClientId === client.id;
    // Check if the broadcast is over
    if (broadcast.endTime) {
      this.logger.log(`room ${payload.room} expired at ${broadcast.endTime.toISOString()}`);
      client.send({message: 'broadcast expired', expiredAt: broadcast.endTime.getTime(), allowAnonymous: broadcast.allowAnonymous });
      return;
    }
    
    // Add client to room
    const room = broadcast.roomId;
    // this.logger.log(`client ${client.id} joined room ${room} as ${payload?.myBroadcast ? 'host' : 'viewer'}`);
    client.join(room);

    const clientUserId = await this.sessionService.getUserFromClientId(client.id);

    // Is this client starting or resuming their own broadcast?
    if (isHosting) {
      // console.log('we are the host, look to reconnect', room, clientUserId)
      const clientIds = Array.from(this.server.sockets.adapter.rooms.get(room)).filter((id) => id !== client.id).map((id) => { const socket = this.server.sockets.sockets.get(id); return socket.id})
      const clients: string[] = [];
      // console.log(`room has ${clientIds.length} other clients connected`)
      for (const id of clientIds) {
        // Looks like the host is reconnecting to an active broadcast. Tell it to reconnect to viewer peers
        const peerUserId = await this.sessionService.getUserFromClientId(id);
        if (peerUserId) {
          clients.push(peerUserId);
        } else {
          console.log(`no user ID for peer client ${id}`)
        }
      }
      if (clients.length) {
        client.send({message: 'connect clients', clients });
      }
    } else {
      const ownerClientId = broadcast.hostClientId;
      if (ownerClientId) {
        console.log(`sending owner ${ownerClientId} message`)
        this.server.to(ownerClientId).emit('message', {user: clientUserId, message: 'user joined room', room, isHost: false });
      } else {
        this.logger.warn(`Failed to determine owner for room ${room}. Falling back to room broadcast about member join`);
        client.broadcast.to(room).emit('message', {user: clientUserId, message: 'user joined room', room, isHost: false});
      }
    }
    // The viewer accepts captions only from this peer, which the peer server has verified to be the owner of its id
    client.send({user: clientUserId, message: 'room joined', room, hostUserId: broadcast.hostUserId });
  }

  /**
   * Registers the socket as its verified user. The id in the payload is not an identity claim: it is honoured only
   * in `report` mode, and only for a client that showed no valid credential (an old client during the rollout).
   */
  @SubscribeMessage('setId')
  async handleSetUserId(client: Socket, payload: { id?: string }): Promise<void> {
    const identity: SocketIdentity | undefined = client.data?.identity;
    if (!identity) {
      this.logger.warn(`setId from client ${client.id}, which has no established identity`);
      return;
    }
    let userId = identity.userId;
    let claimed = false;
    if (payload?.id && payload.id !== userId) {
      if (!identity.credentialed && this.socketIdentity.mode() === 'report') {
        this.socketIdentity.recordLegacyClaim(client.id, payload.id);
        userId = payload.id;
        claimed = true;
        client.data.claimedUserIds = [...(client.data.claimedUserIds ?? []), payload.id];
      } else {
        this.logger.warn(`client ${client.id} named user ${payload.id} but is ${userId}; ignored`);
      }
    }
    const existingClientIds = await this.sessionService.findClientIdsByUserId(userId);
    if (existingClientIds.length) {
      // TODO: Prune disconnected client IDs from db document
      for (const id of existingClientIds) {
        const socket = this.server.sockets.sockets.get(id);
        if (socket?.connected) {
          // This user already has a live client: this one (a second tab) gets its own anonymous id so that its
          // PeerJS id is unique. It is not that user's, so it cannot end that user's broadcast.
          // Not for a report-mode claimant, who has shown nothing that ties it to this user: the room id is theirs
          const broadcastSession = claimed ? null : await this.sessionService.findBroadcastSessionsByClientId(id, true);
          const anonymizedId = await this.sessionService.setUserId(client.id);
          client.send({message: 'set user id success', id: anonymizedId, isAnonymized: true, roomId: broadcastSession?.roomId, ...this.peerTokenFor(client, anonymizedId) })
          return;
        }
      }
    }
    const registeredId = await this.sessionService.setUserId(client.id, userId);
    // The token that keeps an id the server made up is handed over once, with that id
    const anonymousToken = !claimed && registeredId === identity.userId ? identity.anonymousToken : undefined;
    client.send({message: 'set user id success', id: registeredId, ...(anonymousToken && { anonymousToken }), ...this.peerTokenFor(client, registeredId)})
    
    const userRooms = await this.sessionService.findUserRooms(registeredId);
    if (userRooms.length) {
      client.send({message: 'set rooms', rooms: userRooms })
    }
  }

  /**
   * A peer token lets its holder register the id as a PeerJS peer, so it is never issued for an id this socket merely
   * named (report mode), even when a later request is handed that id back.
   */
  private peerTokenFor(client: Socket, userId: string | undefined): { peerToken?: string } {
    if (!userId || (client.data?.claimedUserIds as string[] | undefined)?.includes(userId)) {
      return {};
    }
    return { peerToken: this.peerIdentity.issue(userId) };
  }

  /** A fresh peer token for the id this socket is registered under, for a client whose last one is about to expire */
  @SubscribeMessage('peerToken')
  async handlePeerToken(client: Socket): Promise<void> {
    const userId = await this.sessionService.getUserFromClientId(client.id);
    const { peerToken } = this.peerTokenFor(client, userId ?? undefined);
    if (peerToken) {
      client.send({message: 'peer token', peerToken});
    }
  }

  @SubscribeMessage('endBroadcast')
  async handleEndBroadcast(client: Socket, payload: { room: string}): Promise<void> {
    const broadcast = await this.sessionService.endBroadcastSession(client.id, payload);
    if (!broadcast) {
      this.logger.warn(`endBroadcast for room ${payload.room} from client id ${client.id}: no live broadcast of theirs to end`);
      return;
    }
    // The service only returns the broadcast of the client's own user, so the client is its host
    this.server.in(payload.room).emit('endBroadcast');
    const expiredAt = broadcast.endTime.getTime();
    client.broadcast.to(payload.room).emit('message', { message: 'broadcast ended', expiredAt});
  }

}
