import { PeerServer } from 'peer';
import { Server, Socket } from 'socket.io';
import { generateRoomId, generateUserId } from './libs/utils';
import { CacheService } from './libs/cache';


const socketPort = process.env.SOCKET_PORT ? Number(process.env.SOCKET_PORT) : 3000;
const peerPort = process.env.PEER_PORT ? Number(process.env.PEER_PORT) : 9000;
const allowedOrigin = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : 'http://localhost:4200';
const ioServer = new Server(socketPort, { cors: { origin: allowedOrigin}, transports: ['polling', 'websocket']});
const peerServer = PeerServer({ port: peerPort });
const socketRoomIdMap: Map<string, string> = new Map<string, string>();
const roomOwnerIdMap: Map<string, string> = new Map<string, string>();
const cache = new CacheService();

ioServer.on('connection', (socket: Socket) => {
  console.info(`client connected: ${socket.id}`);

  socket.on('join', async (data?: { room: string, myBroadcast?: boolean }) => {
    if (data?.room) {
      // Check if broadcast ended
      const expiredAt: number | undefined = await cache.get<number>(`${data.room}_broadcast_ended`);
      if (expiredAt) {
        console.info(`room ${data.room} expired at ${new Date(expiredAt).toISOString()}`)
        socket.send({message: 'broadcast expired', expiredAt});
        return;
      } else if (!roomOwnerIdMap.has(data.room) && !data.myBroadcast) {
        console.log('room does not exist')
        socket.send({message: 'broadcast expired', expiredAt: 1});
        return;
      }
    }
    const room: string = data?.room || generateRoomId();
    console.info(`socket id ${socket['userId']} joined room: ${room} as ${data?.myBroadcast ? 'host' : 'listener'}`);
    socket.join(room);
    if (data?.myBroadcast) {
      socketRoomIdMap.set(socket.id, room)
      roomOwnerIdMap.set(room, socket.id);
      // Reconnect to all viewers if this is the broadcast host
      const clientIds = Array.from(ioServer.sockets.adapter.rooms.get(room));
      const clients: string[] = clientIds.filter((id) => id !== socket.id).map((id) => ioServer.sockets.sockets.get(id)).map((socket) => socket['userId'])
      if (clients.length) {
        socket.send({message: 'connect clients', clients });
      }
    } else {
      const ownerSocketId: string | undefined = roomOwnerIdMap.get(room);
      if (ownerSocketId) {
        ioServer.to(ownerSocketId).emit('message', {user: socket['userId'], message: 'user joined room', room, isHost: false });
      } else {
        socket.broadcast.to(room).emit('message', {user: socket['userId'], message: 'user joined room', room, isHost: false });
      }
    }
    socket.send({user: socket['userId'], message: 'room joined', room });
  });

  socket.on('setId', (data?: {id?: string}) => {
    if (data?.id) {
      socket['userId'] = data.id;
      console.log(`user ID received: ${socket['userId']}`)
    } else {
      socket['userId'] = generateUserId();
      socket.send({message: 'set user id', id: socket['userId']});
      console.log(`user ID generated: ${socket['userId']}`)
    }
  })
  
  socket.on('message', (data) => {
    console.log('socket message', data);
    if (data.user && data.message && data.room) {
      ioServer.in(data.room).emit('new messsage', { user: data.user, message: data.message });
    } else {
      console.warn('uhandled message', data);
    }
  })
  
  socket.on('disconnect', async () => {
    if (socket['roomId']) {
      socket.broadcast.to(socket['roomId']).emit('message', {user: socket['userId'], message: 'user left room', room: socket['roomId']})
    }
    console.info(`client disconnected: ${socket['userId']}`);
  })
  
  socket.on('endBroadcast', async (data: {room: string}) => {
    console.log('endBroadcast', data.room);
    ioServer.in(data.room).emit('endBroadcast');
    const isMyRoom = socketRoomIdMap.get(socket.id);
    if (isMyRoom) {
      const expiredAt: number = Date.now();
      await cache.set(`${data.room}_broadcast_ended`, expiredAt);
      socketRoomIdMap.delete(socket.id);
      roomOwnerIdMap.delete(isMyRoom);
      socket.broadcast.to(data.room).emit('message', {message: 'broadcast ended', expiredAt});
    } else {
      console.warn(`endBroadcast from non-room-owner socket ${socket.id}`)
    }
  })

});

peerServer.listen(() => {
  console.log('peer server running');
  peerServer.on('error', (err) => {
    console.log('peer error', err);
  })
});