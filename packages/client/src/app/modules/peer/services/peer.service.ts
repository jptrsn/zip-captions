import { Injectable, Signal, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import Peer, { DataConnection, PeerJSOption } from 'peerjs';
import { BehaviorSubject, Observable, ReplaySubject, Subject, filter, of, take, timeout } from 'rxjs';
import { PeerActions } from '../../../actions/peer.actions';
import { AppState } from '../../../models/app.model';
import { RecognitionStatus } from '../../../models/recognition.model';
import { selectConnectedPeerCount, selectJoinCode, selectPeerServerConnected } from '../../../selectors/peer.selectors';
import { CacheService } from '../../../services/cache/cache.service';
import { selectUserId } from '../../../selectors/user.selector';

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  public liveText$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public textOutput$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  private readonly CACHE_PERSIST_MINS = 60;

  private readonly SOCKET_URL: string;
  private readonly PEER_PORT: number;
  private readonly PEER_URL: string;
  private readonly SOCKET_CONFIG: SocketIoConfig;

  private CONNECT_OPTS: PeerJSOption;
  private myBroadcast = false;
  private myId?: string;
  private roomId: ReplaySubject<string | undefined> = new ReplaySubject();
  private sessionJoinCode: Signal<string | undefined>;
  private socket!: Socket;
  private peer?: Peer;
  private peerMap: Map<string, DataConnection> = new Map();
  private peerServerConnected: Signal<boolean | undefined>;
  private peerCount: Signal<number | undefined>;

  private userId: Signal<string | undefined>;
  
  constructor(private store: Store<AppState>,
              private cache: CacheService) { 
    this.SOCKET_URL = process.env['ZIP_SOCKET_SERVER'] || 'localhost:3000';
    this.PEER_PORT = process.env['ZIP_PEER_PORT'] ? Number(process.env['ZIP_PEER_PORT']) : 3000;
    this.SOCKET_CONFIG = {
      url: `${this.SOCKET_URL}`,
      options: {
        reconnectionAttempts: 10,
        reconnection: true,
      }
    }
    this.PEER_URL = process.env['ZIP_PEER_SERVER'] || 'localhost';
    this.CONNECT_OPTS = {
      debug: 0,
      host: this.PEER_URL,
      port: this.PEER_PORT,
      path: 'peer-server',
      secure: (this.PEER_URL !== 'localhost'),
      config: {
        iceServers: [{
          urls: [
            `stun:stun1.l.google.com:19302`,
            `stun:stun2.l.google.com:19302`
          ]
        }
        ]
      }
    }
    this.peerServerConnected = toSignal(this.store.select(selectPeerServerConnected));
    this.sessionJoinCode = toSignal(this.store.select(selectJoinCode))
    this.peerCount = toSignal(this.store.select(selectConnectedPeerCount));

    this.userId = toSignal(this.store.select(selectUserId))

    effect(() => {
      if (this.userId()) {
        console.log('authed user ID')
        this.myId = this.userId();
        this.cache.save({key: 'userId', data: { id: this.myId }, expirationMins: this.CACHE_PERSIST_MINS})
      }
    })

    // const cached = this.cache.load<{id: string}>('userId')
    // if (cached?.id) {
    //   this.myId = cached.id;
    // }
    
  }

  connectSocket(): Observable<string> {
    console.log('connect socket')
    // console.log(`Socket Server: ${this.SOCKET_CONFIG.url}`);
    // console.log(`Peer connect opts`, this.CONNECT_OPTS)
    
    if (this.socket) {
      throw new Error("Socket already exists")
      this.socket.removeAllListeners();
    }
    this.socket = new Socket(this.SOCKET_CONFIG);
    
    const sub = new Subject<string>();
    this.socket.on('connect', () => {
      console.log('socket connected');
      this.socket.emit('setId', { id: this.myId });
      this.store.dispatch(PeerActions.socketServerConnected())
      if (this.myId) {
        sub.next(this.myId);
        if (!this.peerServerConnected()) {
          console.log('connect peer server', this.myId);
          this.store.dispatch(PeerActions.connectPeerServer());
        }
      }
    });
    this.socket.on('disconnect', () => this.store.dispatch(PeerActions.socketServerDisconnected()))
    this.socket.on('error', (err: any) => {
      sub.error(err.message);
      console.log('error', err);
      this.store.dispatch(PeerActions.socketServerError({error: err.message}))
    })
    this.socket.on('endBroadcast', () => this._disconnectAllPeers());
    this.socket.on('message', (data: any) => {
      console.log('socket message', data);
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
          if (this.myId && this.myId !== data.id) {
            this.socket.emit('setId', { id: this.myId })
            if (data.id === this.myId) {
              sub.next(this.myId);
            }
          } else if (data.id) {
            if (!this.userId() || data.id !== this.userId()) {
              this.myId = data.id;
              console.log('SAVING USER ID', data.id)
              this.cache.save({key: 'userId', data: { id: data.id }, expirationMins: this.CACHE_PERSIST_MINS})
            }
            sub.next(data.id);  
          }
          if (!this.peerServerConnected() && this.myId) {
            console.log('connect peer server', this.myId)
            this.store.dispatch(PeerActions.connectPeerServer());
          }
          break;
        }
        case 'user joined room': {
          if (data.user && data.user !== this.myId) {
            if (!this.peer) {
              throw new Error('Cannot connect to peer - peer server connection not established');
            }
            if (this.myBroadcast) {
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
        case 'broadcast expired':
        case 'broadcast ended': {
          if (data.expiredAt) {
            this.store.dispatch(PeerActions.setBroadcastEndedAt({endedAt: data.expiredAt}))
          }
          break;
        }
        default: {
          console.warn('UNHANDLED MESSAGE!!!', data);
          break;
        }
      }
      
    })
    
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
    this.myBroadcast = !(data?.room); // If we do not have a room ID, we are creating a broadcast
    if (!data?.room) {
      const fromCache = this.cache.load<{room: string; myBroadcast?: boolean}>('roomId');
      if (fromCache?.room) {
        data = { room: fromCache.room, myBroadcast: fromCache?.myBroadcast }
      }
      if (fromCache?.myBroadcast !== undefined) {
        this.myBroadcast = fromCache.myBroadcast;
      }
    }
    if (this.myBroadcast) {
      const fromCache = this.cache.load<{joinCode: string}>('joinCode');
      let joinCode: string;
      if (fromCache) {
        joinCode = fromCache.joinCode;
      } else {
        joinCode = this._generateJoinCode();
        this.cache.save({key: 'joinCode', data: { joinCode }})
      }
      this.store.dispatch(PeerActions.setJoinCode({joinCode}));
    }
    this.socket.volatile().emit('join', { room: data?.room, myBroadcast: this.myBroadcast });
    return this.roomId.asObservable().pipe(filter((v) => !!v)) as Observable<string>;
  }

  sendServerMessage(data: any) {
    this.socket.volatile().emit('message', data);
  }

  connectPeerServer(): Observable<string> {
    if (!this.myId) {
      throw new Error('Must obtain ID from socket server');
    }
    if (this.peer?.id === this.myId && !this.peer.disconnected) {
      console.log('peer server connection already exists and appears to be connected!!!');
      return of(this.myId);
    }
    const sub: ReplaySubject<string> = new ReplaySubject<string>();
    this.CONNECT_OPTS.config!.iceServers![0].username = this.myId;
    this.peer = new Peer(this.myId, this.CONNECT_OPTS);
    this.peer.addListener('open', () => {
      console.log('peer server connection opened')
      this.store.dispatch(PeerActions.peerServerConnected());
      sub.next(this.myId as string);
    });
    this.peer.addListener('disconnected', () => {
      console.log('peer server disconnected')
      if (this.peerServerConnected()) {
        this.store.dispatch(PeerActions.peerServerDisconnected());
      }
    });
    this.peer.once('error', (err: any) => {
      console.log('peer server error', err.message);
      this.store.dispatch(PeerActions.peerServerError({error: err.message}));
      this._reconnectPeerServer();
    })
    this.peer.addListener('connection', (connection: DataConnection) => {
      console.log('incoming connection!', connection);
      this.peerMap.set(connection.connectionId, connection);
      this._handlePeerData(connection);
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
      this.peer!.disconnect();
      console.log('peer disconnected');
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

  endBroadcast(): Observable<void> {
    const sub = new ReplaySubject<void>();
    const fromCache = this.cache.load<{room: string; myBroadcast?: boolean}>('roomId');
    const room: string | undefined = fromCache?.room;
    if (!room) {
      throw new Error('No room defined for broadcast');
    }
    this.cache.remove('roomId');
    this.cache.remove('joinCode');
    this.socket.once('endBroadcast', () => {
      console.log('endbroadcast response recieved');
      sub.next();
      sub.complete();
    });
    this.socket.emit('endBroadcast', { room });
    return sub;
  }

  leaveSession(): void {
    console.log('leaveSession', this.peerMap.size);
    this.cache.remove('roomId');
    this.cache.remove('joinCode');
    this.peerMap.forEach((connection: DataConnection) => {
      console.log('peer', connection.connectionId);
      connection.close();
    });
    this.textOutput$.next([]);
    this.liveText$.next('')
    this.peerMap.clear();
  }

  private _reconnectPeerServer(tryNumber?: number): void {
    let thisTry = tryNumber || 0;
    const timerId = setTimeout(() => {
      if (this.peer?.disconnected && thisTry < 5) {
        this.peer.once('error', () => {
          this._reconnectPeerServer(++thisTry);
        })
        this.peer!.once('open', () => {
          thisTry = 0;
          clearTimeout(timerId)
        })
        this.peer?.reconnect();
      } else if (thisTry < 5) {
        this._reconnectPeerServer(++thisTry);
      } else {
        this.store.dispatch(PeerActions.connectPeerServerFailure({error: 'Peer server connection lost.'}))
        thisTry = 0;
        clearTimeout(timerId);
      }
    }, (thisTry * 1000) + 150);
  }

  private _connectToPeer(peerId: string): void {
    const connection = this.peer!.connect(peerId);
    this._handlePeerData(connection);
    this.peerMap.set(peerId, connection);
    this._updateConnectedPeerCount();
    connection.on('close', () => {
      console.log('connection closed', peerId)
      this.peerMap.delete(peerId);
      this._updateConnectedPeerCount();
    })
  }

  private _updateConnectedPeerCount(): void {
    if (this.peerMap.size !== this.peerCount()) {
      this.store.dispatch(PeerActions.updateConnectedPeerCount({count: this.peerMap.size}));
    }
  }

  private _disconnectAllPeers(): void {
    for (const conn of this.peerMap.values()) {
      conn.close();
    }
    this.peerMap.clear();
    this._updateConnectedPeerCount();
  }

  private _generateJoinCode(): string {
    let outString = '';
    const inOptions = 'acdefghjkmnpqrstuvwxyz2345679';
    for (let j = 0; j < 4; j++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }
    return outString;
  }

  private _handlePeerData(connection: DataConnection) {
    
    connection.on('close', () => {
      console.log('connection closed');
      if (!this.myBroadcast) {
        this.store.dispatch(PeerActions.setHostStatus({hostOnline: false}));
      }
      connection.removeAllListeners();
    });
    
    connection.on('open', () => {
      console.log('peer connection opened', this.myBroadcast);
      if (this.myBroadcast) {
        console.log('must validate join code', this.sessionJoinCode());
        connection.send({request: 'joinCode'})
      }
    });
    
    connection.on('data', (data: any) => {
      if (data?.request) {
        switch (data.request) {
          case 'joinCode':
            connection.send({request: 'validateJoinCode', joinCode: this.sessionJoinCode()});
            break;
          case 'validateJoinCode':
            if (this._verifyJoinCode(data.joinCode)) {
              console.log('join code verified')
              connection.send({response: 'valid'})
            } else {
              console.log('closing connection');
              connection.send({response: 'invalid'})
            }
            break;
          case 'disconnect':
            console.log('disconnect requested');
            connection.close();
            this.store.dispatch(PeerActions.setHostStatus({hostOnline: false}));
            break;
          case 'hostOffline':
            console.log('host offline');
            this.store.dispatch(PeerActions.setHostStatus({hostOnline: false}));
            break;
        }
      } else if (data?.response) {
        switch (data.response) {
          case 'valid':
            console.log('join code valid!');
            this.store.dispatch(PeerActions.setHostStatus({hostOnline: true}));
            break;
          case 'invalid':
            connection.close();
            this.store.dispatch(PeerActions.clearJoinCode());
            break;
        }
      } else if ('recognition' in data && 'type' in data) {
        switch (data.type) {
          case 'live': 
            this.liveText$.next(data.recognition);
            break;
          case 'segment':
            this.textOutput$.next(data.recognition);
            break;
        }
      } else if (data?.type === 'status' && 'status' in data) {
        this.store.dispatch(PeerActions.setBroadcastPausedState({paused: data.status === RecognitionStatus.paused}))
      } else {
        console.warn(`UNHANDLED DATA`, data)
      }
    })
  }

  private _verifyJoinCode(incomingCode?: string): boolean {
    const thisCode = this.sessionJoinCode();
    return !!(thisCode && incomingCode && thisCode === incomingCode.toLowerCase())
  }
  
}
