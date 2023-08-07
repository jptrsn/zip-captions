import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { Observable, ReplaySubject, Subject, filter, take, timeout } from 'rxjs';
import { PeerActions } from '../../../actions/peer.actions';
import Peer, { PeerJSOption } from 'peerjs';

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  private readonly SOCKET_URL: string;
  private readonly SOCKET_PORT: number;
  private readonly PEER_URL: string;
  private readonly PEER_PORT: number;
  private readonly STUN_SERVER: string;
  private readonly TURN_SERVER: string;
  private readonly TURN_PASS: string;
  private readonly SOCKET_CONFIG: SocketIoConfig;

  private CONNECT_OPTS: PeerJSOption;
  private myId?: string;
  private roomId: ReplaySubject<string | undefined> = new ReplaySubject();
  private socket!: Socket;
  private peer?: Peer;
  private peerMap: Map<string, Peer> = new Map();
  
  constructor(private store: Store) { 
    this.SOCKET_URL = process.env['ZIP_SOCKET_SERVER'] || 'localhost';
    this.SOCKET_PORT = process.env['ZIP_SOCKET_PORT'] ? Number(process.env['ZIP_SOCKET_PORT']) : 3000;
    this.SOCKET_CONFIG = {
      url: `${this.SOCKET_URL}:${this.SOCKET_PORT}`,
      options: {
        reconnectionAttempts: 10,
      }
    }
    this.PEER_URL = process.env['ZIP_PEER_SERVER'] || 'localhost';
    this.PEER_PORT = process.env['ZIP_PEER_PORT'] ? Number(process.env['ZIP_PEER_PORT']) : 9000;
    this.STUN_SERVER = process.env['ZIP_STUN_SERVER'] || 'localhost:19302';
    this.TURN_SERVER = process.env['ZIP_TURN_SERVER'] || 'localhost:3478';
    this.TURN_PASS = process.env['ZIP_TURN_PASSWORD'] || 'coturn';
    this.CONNECT_OPTS = {
      debug: 3,
      host: this.PEER_URL,
      port: this.PEER_PORT,
      config: {
        iceServers: [{
          urls: [
            `stun:stun1.l.google.com:19302`,
            `stun:stun2.l.google.com:19302`,
            `stun:${this.STUN_SERVER}`,
            `turn:${this.TURN_SERVER}`
          ],
          credential: this.TURN_PASS
        }
        ]
      }
    }
  }

  connectSocket(): Observable<string> {
    if (!this.socket) {
      this.socket = new Socket(this.SOCKET_CONFIG)
    } else {
      this.socket.removeAllListeners();
    }
    
    const sub = new Subject<string>();
    this.socket.on('connect', () => {
      console.log('socket server connected');
      this.socket.emit('setId', { id: this.myId })
      this.store.dispatch(PeerActions.socketServerConnected())
    });
    this.socket.on('disconnect', () => this.store.dispatch(PeerActions.socketServerDisconnected()))
    this.socket.on('error', (err: any) => {
      console.error(err);
      sub.error(err.message);
    })
    this.socket.on('message', (data: any) => {
      console.log('message', data);
      switch (data.message) {
        case 'room joined': {
          if (data.room) {
            console.log('nexting room id', data.room)
            this.roomId.next(data.room);
          }
          break;
        }
        case 'set user id': {
          if (this.myId) {
            console.log('already have ID locally');
            this.socket.emit('setId', { id: this.myId })
          } else if (data.id) {
            this.myId = data.id;
            sub.next(data.id);
          }
          break;
        }
        default: {
          this.store.dispatch(PeerActions.socketServerMessageReceived(data));
          break;
        }
      }
      
    })
    return sub.asObservable().pipe(timeout(500), take(1));
  }

  disconnectSocket(): Observable<boolean> {
    const sub = new Subject<boolean>();
    this.socket.removeListener('disconnect');
    this.socket.on('disconnect', () => {
      sub.next(true);
    });
    setTimeout(() => this.socket.disconnect(), 1)
    return sub.asObservable().pipe(timeout(500), take(1));
  }

  joinRoom(data?: { room: string }): Observable<string> {
    console.log('join room');
    this.socket.volatile().emit('join', data);
    return this.roomId.asObservable().pipe(filter((v) => !!v)) as Observable<string>;
  }

  sendServerMessage(data: any) {
    this.socket.volatile().emit('message', data);
  }

  connectPeerServer(): Observable<string> {
    if (!this.myId) {
      throw new Error('Must obtain ID from socket server');
    }
    const sub: Subject<string> = new Subject<string>();
    this.peer = new Peer(this.myId, this.CONNECT_OPTS);
    this.peer.addListener('open', () => {
      this.store.dispatch(PeerActions.peerServerConnected())
      sub.next(this.myId as string)
    });
    this.peer.addListener('disconnected', () => this.store.dispatch(PeerActions.peerServerDisconnected()))
    return sub.asObservable().pipe(take(1));
  }

  disconnectPeerServer(): Observable<boolean> {
    if (!this.peer) {
      throw new Error('Peer not connected')
    }
    const sub: Subject<boolean> = new Subject<boolean>();
    this.peer.removeListener('close');
    this.peer.addListener('disconnected', () => {
      console.log('disconnected')
      sub.next(true)
    });
    setTimeout(() => this.peer!.destroy(), 1);
    return sub.asObservable().pipe(take(1));
  }

  
}
