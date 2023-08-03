import { PeerServer } from 'peer';
import { Server } from 'socket.io';
import { generateRoomId, generateUserId } from './utils';


const socketPort = process.env.SOCKET_PORT ? Number(process.env.SOCKET_PORT) : 3000;
const peerPort = process.env.PEER_PORT ? Number(process.env.PEER_PORT) : 9000;

const ioServer = new Server(socketPort, { cors: { origin: 'http://localhost:4200'}, transports: ['polling', 'websocket']});
const peerServer = PeerServer({ port: peerPort });

ioServer.engine.generateId = () => generateUserId();

ioServer.on('connection', (socket) => {
  console.info(`client connected: ${socket.id}`);
  
  socket.on('join', (data?: { room: string }) => {    
    const room: string = data?.room || generateRoomId();
    console.info(`socket id ${socket.id} joined room: ${room}`);
    socket.join(room);
    socket.broadcast.to(room).emit('user joined');
    socket.send({user: socket.id, message: 'room joined', room })
  });
  
  socket.on('message', (data) => {
    ioServer.in(data.room).emit('new messsage', { user: data.user, message: data.message });
  })
  
  socket.on('disconnect', () => {
    console.info(`client disconnected: ${socket.id}`);
  })
});

peerServer.listen(() => {
  console.log('peer server running');
});