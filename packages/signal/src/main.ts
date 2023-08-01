import express from 'express';
import { Server } from 'socket.io';
import { PeerServer } from 'peer';

// const host = process.env.HOST ?? 'localhost';
// const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const socketPort = process.env.SOCKET_PORT ? Number(process.env.SOCKET_PORT) : 3000;
const peerPort = process.env.PEER_PORT ? Number(process.env.PEER_PORT) : 9000;

const ioServer = new Server(socketPort, {});
const peerServer = PeerServer({ port: peerPort });
// const app = express();

// app.get('/', (req, res) => {
//   res.send({ message: 'Hello API' });
// });

// app.listen(port, host, () => {
//   console.log(`[ ready ] http://${host}:${port}`);
// });



ioServer.on('connection', (socket) => {
  console.info(`client connected: ${socket.id}`);
  
  socket.on('join', (data) => {
    console.info(`socket joined room: ${data.room}`);
    socket.join(data.room);
    socket.broadcast.to(data.room).emit('user joined');
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