import { PeerServer } from 'peer';
import { Server } from 'socket.io';
import { generateRoomId, generateUserId } from './utils';


const socketPort = process.env.SOCKET_PORT ? Number(process.env.SOCKET_PORT) : 3000;
const peerPort = process.env.PEER_PORT ? Number(process.env.PEER_PORT) : 9000;

const ioServer = new Server(socketPort, { cors: { origin: 'http://localhost:4200'}, transports: ['polling', 'websocket']});
const peerServer = PeerServer({ port: peerPort });

ioServer.on('connection', (socket) => {
  console.info(`client connected: ${socket.id}`);
  
  socket.on('join', (data?: { room: string }) => {    
    const room: string = data?.room || generateRoomId();
    console.info(`socket id ${socket['userId']} joined room: ${room}`);
    socket.join(room);
    socket.broadcast.to(room).emit('user joined');
    socket.send({user: socket['userId'], message: 'room joined', room })
  });

  socket.on('setId', (data?: {id?: string}) => {
    if (data?.id) {
      socket['userId'] = data.id;
    } else {
      socket['userId'] = generateUserId();
      socket.send({message: 'set user id', id: socket['userId']});
    }
    console.log(`user ID active: ${socket['userId']}`)
  })
  
  socket.on('message', (data) => {
    console.log('socket message', data);
    if (data.user && data.message && data.room) {
      ioServer.in(data.room).emit('new messsage', { user: data.user, message: data.message });
    } else {
      console.log('uhandled message', data);
    }
  })
  
  socket.on('disconnect', () => {
    console.info(`client disconnected: ${socket['userId']}`);
  })
});



peerServer.listen(() => {
  console.log('peer server running');
});