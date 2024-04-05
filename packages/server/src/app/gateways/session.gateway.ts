import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from "socket.io";
import { CacheService } from '../services/cache/cache.service';
import { SessionService } from '../services/session/session.service';
import { BroadcastSession } from '../models/broadcast-session.model';

@WebSocketGateway({ cors: true })
export class SessionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(SessionGateway.name);
  private clientToUserIdMap: Map<string, string> = new Map();
  private clientBroadcastIdMap: Map<string, string> = new Map();
  @WebSocketServer() server: Server;

  constructor(private cache: CacheService,
              private sessionService: SessionService) { }
  
  // Gateway connection handler
  async handleConnection(client: Socket): Promise<void> {
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
  
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): WsResponse<string> {
    console.log('message payload', payload);
    if (payload.user && payload.message && payload.room) {
      console.log(`broadcast to ${payload.room}`, payload.message);
      this.server.in(payload.room).emit('message', { user: payload.user, message: payload.message, room: payload.room })
    } else {
      console.warn('Unhandled message payload with keys: ', Object.keys(payload).toString())
    }
    return { event: 'message', data: 'Hello World' };
  }

  @SubscribeMessage('join')
  async handleJoin(client: Socket, payload: { room?: string, myBroadcast?: boolean}): Promise<void> {
    
    const broadcast = await this.sessionService.getBroadcastSession(client.id, payload);
    const isHosting = broadcast.hostClientId === client.id;
    // Check if the broadcast is over
    if (broadcast.endTime) {
      // this.logger.log(`room ${payload.room} expired at ${broadcast.endTime.toISOString()}`);
      client.send({message: 'broadcast expired', expiredAt: broadcast.endTime.getTime()});
      return;
    }
    
    // Add client to room
    const room = broadcast.roomId;
    // this.logger.log(`client ${client.id} joined room ${room} as ${payload?.myBroadcast ? 'host' : 'viewer'}`);
    client.join(room);

    const clientUserId = await this.sessionService.getUserFromClientId(client.id);

    // Is this client starting or resuming their own broadcast?
    if (isHosting) {
      const clientIds = Array.from(this.server.sockets.adapter.rooms.get(room)).filter((id) => id !== client.id).map((id) => { const socket = this.server.sockets.sockets.get(id); return socket.id})
      const clients: string[] = [];
      for (const id of clientIds) {
        // Looks like the host is reconnecting to an active broadcast. Tell it to reconnect to viewer peers
        const peerUserId = await this.sessionService.getUserFromClientId(id);
        if (peerUserId) {
          clients.push(peerUserId);
        }
      }
      if (clients.length) {
        client.send({message: 'connect clients', clients });
      }
    } else {
      const ownerClientId = broadcast.hostClientId;
      if (ownerClientId) {
        this.server.to(ownerClientId).emit('message', {user: clientUserId, message: 'user joined room', room, isHost: false });
      } else {
        this.logger.warn(`Failed to determine owner for room ${room}. Falling back to room broadcast about member join`);
        client.broadcast.to(room).emit('message', {user: clientUserId, message: 'user joined room', room, isHost: false});
      }
    }
    client.send({user: clientUserId, message: 'room joined', room });
  }

  @SubscribeMessage('setId')
  async handleSetUserId(client: Socket, payload: { id?: string }): Promise<void> {
    const userId = await this.sessionService.setUserId(client.id, payload.id);
    if (!payload.id) {
      client.send({message: 'set user id', id: userId})
    }
    const userRooms = await this.sessionService.findUserRooms(userId, { isStatic: true });
    if (userRooms.length) {
      client.send({message: 'set rooms', rooms: userRooms })
    }
  }

  @SubscribeMessage('endBroadcast')
  async handleEndBroadcast(client: Socket, payload: { room: string}): Promise<void> {
    const broadcast = await this.sessionService.endBroadcastSession(client.id, payload);
    const userId = await this.sessionService.getUserFromClientId(client.id);
    // this.logger.log(`end ${payload.room} broadcast`)
    this.server.in(payload.room).emit('endBroadcast');
    if (broadcast.hostUserId === userId) {
      const expiredAt = broadcast.endTime.getTime();
      client.broadcast.to(payload.room).emit('message', { message: 'broadcast ended', expiredAt});
    } else {
      this.logger.warn(`endBroadcast from non-owner client id ${client.id}`);
    }
  }

}
