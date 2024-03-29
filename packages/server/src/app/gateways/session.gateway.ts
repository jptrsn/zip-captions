import { Inject, Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from "socket.io";
import { v4 } from 'uuid';
import { CacheService } from '../services/cache/cache.service';

@WebSocketGateway({ cors: true })
export class SessionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(SessionGateway.name);
  private clientToUserIdMap: Map<string, string> = new Map();
  private clientBroadcastIdMap: Map<string, string> = new Map();
  @WebSocketServer() server: Server;

  constructor(private cache: CacheService) { }
  
  // Gateway connection handler
  handleConnection(client: Socket, ...args: any[]): void {
    this.logger.log(`client ${client.id} connected`);
  }
  
  // Gateway disconnect handler
  async handleDisconnect(client: Socket) {
    const clientBroadcastRoom: string | undefined = this.clientBroadcastIdMap.get(client.id);
    if (clientBroadcastRoom) {
      const clientUserId = this.clientToUserIdMap.get(client.id);
      client.broadcast.to(clientBroadcastRoom).emit('message', { user: clientUserId, message: 'user left room', room: clientBroadcastRoom });
    }
    this.logger.log(`client ${client.id} disconnected`);
  }
  
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): WsResponse<string> {
    this.logger.log('message payload', payload);
    if (payload.user && payload.message && payload.room) {
      this.server.in(payload.room).emit('message', { user: payload.user, message: payload.message, room: payload.room })
    } else {
      this.logger.warn('Unhandled message payload with keys: ', Object.keys(payload).toString())
    }
    return { event: 'message', data: 'Hello World' };
  }

  @SubscribeMessage('join')
  async handleJoin(client: Socket, payload?: { room?: string, myBroadcast?: boolean}): Promise<void> {
    const clientUserId: string | undefined = this.clientToUserIdMap.get(client.id);
    if (!clientUserId) {
      this.logger.error(`client ${client.id} attempted to join without generated user ID`);
    }

    // Check if joining a room
    if (payload?.room) {
      const expiredAt: number | null = await this.cache.get<number>(`${payload.room}_broadcast_ended`);
      if (expiredAt) {
        this.logger.log(`room ${payload.room} expired at ${new Date(expiredAt).toISOString()}`);
        client.send({message: 'broadcast expired', expiredAt});
        return;
      } else {
        const hostId: string | null = await this.cache.get<string>(`${payload.room}_host_client_id`);
        if (!hostId && !payload.myBroadcast) {
          this.logger.log(`room ${payload.room} has no expiration and no host`);
          client.send({message: 'broadcast expired', expiredAt: 1});
          return;
        }
      }
    }
    
    // Add client to room
    const room: string = payload?.room || this._generateRandomRoomId();
    this.logger.log(`client ${client.id} joined room ${room} as ${payload?.myBroadcast ? 'owner' : 'viewer'}`);
    client.join(room);

    // Is this client starting or resuming their own broadcast?
    if (payload?.myBroadcast) {
      // Mark room owner
      await this.cache.set(`${room}_host_client_id`, client.id);
      this.clientBroadcastIdMap.set(client.id, room);

      // Check for room members, tell owner to reconnect if any are already connected
      const clientIds = Array.from(this.server.sockets.adapter.rooms.get(room));
      const clients: string[] = clientIds.filter((id) => id !== client.id).map((id) => this.server.sockets.sockets.get(id)).map((socket) => this.clientToUserIdMap.get(socket.id))
      if (clients.length) {
        client.send({message: 'connect clients', clients });
      }
    } else {
      const ownerClientId = await this.cache.get<string>(`${room}_host_client_id`);
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
  async handleSetUserId(client: Socket, payload: { id?: string }): Promise<WsResponse<{message: string, id: string}>> {
    let userId: string;
    if (payload.id) {
      userId = payload.id;
    } else {
      userId = await this.cache.wrap(`client_id_${client.id}`, async () => v4());
      client.send({message: 'set user id', id: userId})
    }
    this.clientToUserIdMap.set(client.id, userId);
    return {event: 'setUserId', data: { message: 'set user id', id: client.id }}
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

  private _generateRandomRoomId(isStatic?: boolean): string {
    let outString: string;
    const outParts: string[] = [];
    const inOptions = 'acdefghjkmnpqrstuvwxyz2345679';
    
    outParts.push(this._generatePrefix(inOptions, isStatic));
    for (let i = 0; i < 2; i++) {
      outString = '';
      for (let j = 0; j < 4; j++) {
        outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
      }
      outParts.push(outString);
    }
    return outParts.join('-');
  }

  private _generatePrefix(inOptions: string, isStatic?: boolean): string {
    let outString: string;
    do {
      outString = '';
      for (let i = 0; i < 2; i++) {
        outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
      }
    } while (this._prefixIndicatesDynamic(outString) === !isStatic)
    return outString;
  }

  private _prefixIndicatesDynamic(prefix: string): boolean {
    if (prefix.length < 2) {
      throw new Error("Incorrect session ID prefix")
    }
    let currentValue = 0;
    for (let i = 0; i < 2; i++) {
      currentValue += prefix.charCodeAt(i)
    }
    return !!(currentValue % 2)
  }

}
