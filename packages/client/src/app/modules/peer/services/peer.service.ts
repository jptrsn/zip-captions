import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  private readonly SOCKET_URL: string;
  private readonly SOCKET_PORT: number;
  private readonly PEER_URL: string;
  private readonly PEER_PORT: number;
  private socket: Socket;
  
  constructor() { 
    this.SOCKET_URL = process.env['ZIP_SOCKET_SERVER'] || 'localhost';
    this.SOCKET_PORT = process.env['ZIP_SOCKET_PORT'] ? Number(process.env['ZIP_SOCKET_PORT']) : 3000;
    this.PEER_URL = process.env['ZIP_PEER_SERVER'] || 'localhost';
    this.PEER_PORT = process.env['ZIP_PEER_PORT'] ? Number(process.env['ZIP_PEER_PORT']) : 9000;
    this.socket = new Socket({url: `${this.SOCKET_URL}:${this.SOCKET_PORT}`})
    
    this.socket.on('connect', () => {
      console.log('connected', this.socket.ioSocket.id);
    });
    this.socket.on('disconnect', () => {{
      console.log('disconnected');
    }})
    this.socket.on('message', (data: any) => {
      console.log('message', data);
    })
  }

  joinRoom(data: { room: string }) {
    this.socket.emit('join', data);
  }

  sendServerMessage(data: any) {
    this.socket.emit('message', data);
  }

  getServerMessages(): Signal<{user: string, message: string} | undefined> {
    const obs: Observable<{user: string, message: string}> = new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data: {user: string, message: string}) => observer.next(data))
      return () => this.socket.disconnect();
    });
    return toSignal(obs);
  }
}
