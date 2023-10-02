import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server } from "socket.io";
import { v4 } from 'uuid';

@WebSocketGateway({ cors: true })
export class SessionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(SessionGateway.name);
  private socketIdClientIdMap: Map<string, string> = new Map();

  @WebSocketServer() server: Server;
  
  // Gateway connection handler
  handleConnection(client: any, ...args: any[]): void {
    this.logger.log(`client ${client.id} connected`);
  }
  
  // Gateway disconnect handler
  handleDisconnect(client: any) {
    this.logger.log(`client ${client.id} disconnected`);
  }
  
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): WsResponse<string> {
    this.logger.log('message payload', payload);
    return { event: 'message', data: 'Hello World' };
  }

  @SubscribeMessage('join')
  handleJoin(client: any, payload?: { room?: string, myBroadcast?: boolean}): WsResponse<{user: string, message: string, room: string}> {
    this.logger.log(`client ${client.id} join payload:`)
    this.logger.log(payload);
    return {event: 'join', data: { user: client.id, message: 'room joined', room: payload.room}}
  }

  @SubscribeMessage('setId')
  handleSetUserId(client: any, payload: any): WsResponse<any> {
    let userId: string;
    if (payload.id) {
      userId = payload.id;
    } else {
      userId = v4();
      client.send({message: 'set user id', id: userId})
    }
    this.socketIdClientIdMap.set(client.id, userId);
    return {event: 'setUserId', data: { message: 'set user id', id: client.id }}
  }

}
