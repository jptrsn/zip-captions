import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from "socket.io";
import { CacheService } from '../services/cache/cache.service';
import { SessionService } from '../services/session/session.service';

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
    const userId = await this.sessionService.handleClientConnected(client.id);
    if (userId) {
      console.log(`connection from established user ${userId}`)
      client.send({message: 'set user id', id: userId})
    }
  }
  
  // Gateway disconnect handler
  async handleDisconnect(client: Socket) {
    this.sessionService.handleClientDisconnected(client.id);
    const clientBroadcastRoom: string | undefined = this.clientBroadcastIdMap.get(client.id);
    if (clientBroadcastRoom) {
      const clientUserId = this.clientToUserIdMap.get(client.id);
      client.broadcast.to(clientBroadcastRoom).emit('message', { user: clientUserId, message: 'user left room', room: clientBroadcastRoom });
    }
  }
  
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): WsResponse<string> {
    this.logger.log('message payload', payload);
    if (payload.user && payload.message && payload.room) {
      console.log(`broadcast to ${payload.room}`, payload.message);
      this.server.in(payload.room).emit('message', { user: payload.user, message: payload.message, room: payload.room })
    } else {
      this.logger.warn('Unhandled message payload with keys: ', Object.keys(payload).toString())
    }
    return { event: 'message', data: 'Hello World' };
  }

  @SubscribeMessage('join')
  async handleJoin(client: Socket, payload: { room?: string, myBroadcast?: boolean}): Promise<void> {
    
    const broadcast = await this.sessionService.getBroadcastSession(client.id, payload);
    const isHosting = broadcast.hostClientId === client.id;
    // Check if the broadcast is over
    if (broadcast.endTime) {
      this.logger.log(`room ${payload.room} expired at ${broadcast.endTime.toISOString()}`);
      client.send({message: 'broadcast expired', expiredAt: broadcast.endTime});
      return;
    }
    
    // Add client to room
    const room = broadcast.roomId;
    this.logger.log(`client ${client.id} joined room ${room} as ${payload?.myBroadcast ? 'host' : 'viewer'}`);
    client.join(room);

    const clientUserId = await this.sessionService.getUserFromClientId(client.id);

    // Is this client starting or resuming their own broadcast?
    if (isHosting) {

      const clientIds = Array.from(this.server.sockets.adapter.rooms.get(room));
      const clients: string[] = clientIds.filter((id) => id !== client.id).map((id) => this.server.sockets.sockets.get(id)).map((socket) => this.clientToUserIdMap.get(socket.id))
      if (clients.length) {
        client.send({message: 'connect clients', clients });
      }
    } else {
      const ownerClientId = broadcast.hostClientId;
      if (ownerClientId) {
        this.server.to(ownerClientId).emit('message', {user: clientUserId, message: 'user joined room', room, isHost: false });
      } else {
        this.logger.warn(`Failed to determine owner for room ${room}. Falling back to room broadcast about member join`);
        client.broadcast.to(room).emit('message', {user: clientUserId, message: 'user joined room', room, isHost: false})
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
    this.logger.log(`end ${payload.room} broadcast`)
    this.server.in(payload.room).emit('endBroadcast');
    const hostId: string | null = await this.cache.get<string>(`${payload.room}_host_client_id`);
    if (hostId === client.id) {
      const expiredAt = Date.now();
      await this.cache.set(`${payload.room}_broadcast_ended`, expiredAt);
      this.clientBroadcastIdMap.delete(client.id);
      client.broadcast.to(payload.room).emit('message', { message: 'broadcast ended', expiredAt});
    } else {
      this.logger.warn(`endBroadcastr from non-owner client id ${client.id}`);
    }
  }

}
