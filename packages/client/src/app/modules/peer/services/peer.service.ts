import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import Peer, { DataConnection, PeerJSOption } from 'peerjs';
import { Observable, ReplaySubject, Subject, filter, take, timeout } from 'rxjs';
import { PeerActions } from '../../../actions/peer.actions';
import { CacheService } from '../../../services/cache/cache.service';

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  private readonly CACHE_PERSIST_MINS = 60;

  private readonly SOCKET_URL: string;
  private readonly SOCKET_PORT: number;
  private readonly PEER_URL: string;
  private readonly PEER_PORT: number;
  private readonly STUN_SERVER: string;
  private readonly TURN_SERVER: string;
  private readonly TURN_PASS: string;
  private readonly SOCKET_CONFIG: SocketIoConfig;

  private CONNECT_OPTS: PeerJSOption;
  private myBroadcast = false;
  private myId?: string;
  private roomId: ReplaySubject<string | undefined> = new ReplaySubject();
  private socket!: Socket;
  private peer?: Peer;
  private peerMap: Map<string, DataConnection> = new Map();
  
  constructor(private store: Store,
              private cache: CacheService) { 
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
      secure: this.PEER_URL === 'localhost',
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

    const cached = this.cache.load('userId')
    if (cached?.id) {
      console.log('cached', cached.id);
      this.myId = cached.id;
    }
    console.log('env', process.env)
    console.log(`Socket Server: ${this.SOCKET_URL}:${this.SOCKET_PORT}`);
    console.log(`Peer Server: ${this.PEER_URL}:${this.PEER_PORT}`)
    
  }

  connectSocket(): Observable<string> {
    if (!this.socket) {
      this.socket = new Socket(this.SOCKET_CONFIG);
    } else {
      this.socket.removeAllListeners();
      this.socket.connect();
    }
    
    const sub = new Subject<string>();
    this.socket.on('connect', () => {
      this.socket.emit('setId', { id: this.myId })
      this.store.dispatch(PeerActions.socketServerConnected())
      if (this.myId) {
        sub.next(this.myId);
      }
    });
    this.socket.on('disconnect', () => this.store.dispatch(PeerActions.socketServerDisconnected()))
    this.socket.on('error', (err: any) => {
      sub.error(err.message);
    })
    this.socket.on('message', (data: any) => {
      console.log('message', data);
      switch (data.message) {
        case 'room joined': {
          if (data.room) {
            console.log('nexting room id', data.room);
            this.cache.save({key: 'roomId', data: { room: data.room, myBroadcast: this.myBroadcast }, expirationMins: this.CACHE_PERSIST_MINS});
            this.roomId.next(data.room);
          }
          break;
        }
        case 'set user id': {
          console.log('set user id', data.id, this.myId)
          if (this.myId) {
            this.socket.emit('setId', { id: this.myId })
            if (data.id === this.myId) {
              sub.next(this.myId);
            }
          } else if (data.id) {
            this.myId = data.id;
            console.log('SAVING USER ID', data.id)
            this.cache.save({key: 'userId', data: { id: data.id }, expirationMins: this.CACHE_PERSIST_MINS})
            sub.next(data.id);
          }
          break;
        }
        case 'user joined room': {
          if (data.user && data.user !== this.myId) {
            if (!this.peer) {
              throw new Error('Cannot connect to peer - peer server connection not established');
            }
            if (this.myBroadcast) {
              console.log('connect to this peer!', data.user);
              this._connectToPeer(data.user);
            } else {
              console.log('not my broadcast, peer connected', data.user)
            }
          }
          break;
        }
        case 'user left room': {
          if (data.user) {
            console.log('disconnect from peer!', data)
            const connection: DataConnection | undefined = this.peerMap.get(data.user);
            if (connection) {
              connection.addListener('close', () => {
                console.log('closed!');
                this.peerMap.delete(data.user);
              })
              connection.close();
            }
          }
          break;
        }
        case 'connect clients': {
          if (data.clients) {
            const clientIds: string[] = data.clients;
            console.log('clientIds', clientIds, this.myId);
            for (const id of clientIds) {
              if (id !== this.myId) {
                this._connectToPeer(id);
              }
            }
          }
          break;
        }
        default: {
          console.warn('UNHANDLED MESSAGE!!!', data);
          this.store.dispatch(PeerActions.socketServerMessageReceived(data));
          break;
        }
      }
      
    })
    
    console.log('returning subject with timeout')
    return sub.asObservable().pipe(timeout(30000), take(1));
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

  joinRoom(data?: { room: string, myBroadcast?: boolean }): Observable<string> {
    this.myBroadcast = !(data?.room); // If we do not have a room ID to join, we are creating a broadcast
    if (!data?.room) {
      const fromCache = this.cache.load('roomId');
      console.log('fromCache', fromCache);
      if (fromCache?.room) {
        data = { room: fromCache.room, myBroadcast: fromCache?.myBroadcast }
      }
      if (fromCache?.myBroadcast !== undefined) {
        this.myBroadcast = fromCache.myBroadcast;
      }
    }
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
    this.CONNECT_OPTS.config!.iceServers![0].username = this.myId;
    this.peer = new Peer(this.myId, this.CONNECT_OPTS);
    this.peer.addListener('open', () => {
      this.store.dispatch(PeerActions.peerServerConnected())
      sub.next(this.myId as string);
    });
    this.peer.addListener('disconnected', () => this.store.dispatch(PeerActions.peerServerDisconnected()));
    this.peer.once('error', (err: any) => {
      console.log(err.message);
      this._reconnectPeer();
    })
    this.peer.addListener('connection', (connection: DataConnection) => {
      console.log('incoming connection!', connection);
    })
    return sub.asObservable().pipe(take(1));
  }

  disconnectPeerServer(): Observable<boolean> {
    if (!this.peer) {
      throw new Error('Peer not connected')
    }
    const sub: Subject<boolean> = new Subject<boolean>();
    this.peer.removeListener('close');
    this.peer.addListener('disconnected', () => {
      sub.next(true);
    });
    setTimeout(() => {
      this.peer!.destroy();
      console.log('peer destroyed');
    }, 1);
    return sub.asObservable().pipe(take(1));
  }

  sendData(peerId: string, data: any): void {
    const connection: DataConnection | undefined = this.peerMap.get(peerId);
    if (!connection) {
      throw new Error(`connection ${peerId} not found`)
    } else {
      connection.send(data)
    }
  }

  broadcastData(data: any): void {
    for (const conn of this.peerMap.values()) {
      conn.send(data);
    }
  }

  private _reconnectPeer(tryNumber?: number): void {
    let thisTry = tryNumber || 0;
    const timerId = setTimeout(() => {
      if (this.peer?.disconnected) {
        this.peer.once('error', () => {
          this._reconnectPeer(++thisTry);
        })
        this.peer!.once('open', () => {
          thisTry = 0;
          clearTimeout(timerId)
        })
        this.peer?.reconnect();
      } else if (thisTry < 5) {
        this._reconnectPeer(++thisTry);
      } else {
        this.store.dispatch(PeerActions.connectPeerServerFailure({error: 'Reconnect timed out'}))
        thisTry = 0;
      }
    }, (thisTry * 1000) + 150);
  }

  private _connectToPeer(peerId: string): void {
    const connection = this.peer!.connect(peerId);
    this.peerMap.set(peerId, connection);
    this.store.dispatch(PeerActions.updateConnectedPeerCount({count: this.peerMap.size}));
    connection.on('close', () => {
      this.peerMap.delete(peerId);
      this.store.dispatch(PeerActions.updateConnectedPeerCount({count: this.peerMap.size}));
    })
  }

  
}
