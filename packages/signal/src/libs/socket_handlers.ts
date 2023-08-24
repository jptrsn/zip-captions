import { Server, Socket } from 'socket.io';
import { generateRoomId, generateUserId } from './utils';
import { CacheService } from './cache';

export class SocketHandler {
  private ioServer: Server;
  private socket: Socket;
  private cache: CacheService;

  private userId?: string;
  private roomId?: string;

  constructor(socket: Socket, server: Server, cache: CacheService) {
    this.ioServer = server;
    this.socket = socket;
    this.cache = cache;
  }

  public async onJoin(data?: { room: string, myBroadcast?: boolean }): Promise<void> {
    const room: string = data?.room || generateRoomId();
    console.info(`socket id ${this.socket['userId']} joined room: ${room} as ${data?.myBroadcast ? 'host' : 'listener'}`);
    this.socket['roomId'] = room;
    this.socket.join(room);
    if (data?.myBroadcast) {
      // Reconnect to all viewers if this is the broadcast host
      const clientIds = Array.from(this.ioServer.sockets.adapter.rooms.get(room));
      const clients: string[] = clientIds.filter((id) => id !== this.socket.id).map((id) => this.ioServer.sockets.sockets.get(id)).map((socket) => socket['userId'])
      if (clients.length) {
        this.socket.send({message: 'connect clients', clients });
      }
    } else {
      this.socket.broadcast.to(room).emit('message', {user: this.userId, message: 'user joined room', room, isHost: data?.myBroadcast });
    }
    this.socket.send({user: this.socket['userId'], message: 'room joined', room })
  }

  public async onSetId(data?: { id?: string}): Promise<void> {
    if (data?.id) {

      this.userId = data.id;
      console.log(`user ID received: ${this.userId}`)
    } else {
      const fromCache = await this.cache.get<string>(`${this.socket.id}_user_id`);
      if (fromCache) {
        this.userId = fromCache;
      } else {
        this.userId = generateUserId();
        await this.cache.set(`${this.socket.id}_user_id`, this.userId)
      }
      this.socket['userId'] = generateUserId();
      this.socket.send({message: 'set user id', id: this.socket['userId']});
      console.log(`user ID generated: ${this.socket['userId']}`)
    }
  }
}