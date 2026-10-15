import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MockStore } from '@ngrx/store/testing';
import { AppState } from '../../../models/app.model';
import { defaultAppState } from '../../../reducers/app.reducer';
import { TestingModuleProviders } from '../../../../testing/test-scaffold';
import { CacheService } from '../../../services/cache/cache.service';
import { StorageService } from '../../../services/storage.service';
import { PeerService } from './peer.service';

// A socket that never connects: it records what the service registers and emits, and lets a spec deliver messages
const fakeSockets: FakeSocket[] = [];
class FakeSocket {
  handlers = new Map<string, (data?: any) => void>();
  emitted: [string, unknown][] = [];
  ioSocket = { connected: true };
  connect = jest.fn();
  disconnect = jest.fn();
  constructor(public config: any) { fakeSockets.push(this); }
  on(event: string, handler: (data?: any) => void) { this.handlers.set(event, handler); }
  removeAllListeners() { this.handlers.clear(); }
  emit(event: string, payload: unknown) { this.emitted.push([event, payload]); }
  receive(message: object) { this.handlers.get('message')?.(message); }
}
jest.mock('ngx-socket-io', () => ({ Socket: jest.fn().mockImplementation((config: any) => new FakeSocket(config)) }));

// A peer that never reaches a server: it records how it was made, and lets a spec drive its state
const fakePeers: FakePeer[] = [];
class FakePeer {
  disconnected = false;
  _options: { token?: string };
  reconnect = jest.fn();
  constructor(public id: string, public options: { token?: string }) { this._options = { ...options }; fakePeers.push(this); }
  addListener() { return this; }
  once() { return this; }
  on() { return this; }
}
jest.mock('peerjs', () => ({ __esModule: true, default: jest.fn().mockImplementation((id: string, options: any) => new FakePeer(id, options)) }));

// Angular 16 has no way to flush effects by hand; change detection of any component does it
@Component({ template: '' })
class EffectsHostComponent {}
const effectsRun = async () => { TestBed.createComponent(EffectsHostComponent).detectChanges(); };

describe('PeerService', () => {
  let service: PeerService;
  let cache: CacheService;
  let storage: StorageService;

  beforeEach(() => {
    fakeSockets.length = 0;
    fakePeers.length = 0;
    sessionStorage.clear();
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: TestingModuleProviders
    });
    service = TestBed.inject(PeerService);
    cache = TestBed.inject(CacheService);
    storage = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('socket credentials', () => {
    const handshake = (): { token?: string; anonymousToken?: string } => {
      let sent: object | undefined;
      (service['SOCKET_CONFIG'].options!.auth as (cb: (data: object) => void) => void)((data: object) => { sent = data; });
      return sent as never;
    };

    it('are given as a function, so each connection attempt presents the current ones', () => {
      expect(typeof service['SOCKET_CONFIG'].options!.auth).toBe('function');
      expect(handshake()).toEqual({ token: undefined, anonymousToken: undefined });
      storage.set('token', 'login-jwt');
      cache.save({ key: 'anonymousToken', data: { token: 'anon-jwt' }, expirationMins: 10 });
      expect(handshake()).toEqual({ token: 'login-jwt', anonymousToken: 'anon-jwt' });
      storage.remove('token');
      expect(handshake().token).toBeUndefined();
    });

    it('do not treat the storage service\'s failure value as a token', () => {
      localStorage.setItem('token', '{not json');
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      expect(handshake().token).toBeUndefined();
    });
  });

  describe('the answer to setId', () => {
    const connect = () => {
      service.connectSocket().subscribe({ error: () => undefined });
      return fakeSockets[fakeSockets.length - 1];
    };

    it('keeps the anonymous token the server issues, for the next connection', () => {
      const socket = connect();
      socket.receive({ message: 'set user id success', id: 'issued-id', anonymousToken: 'anon-jwt' });
      expect(cache.load<{ token: string }>('anonymousToken')).toEqual({ token: 'anon-jwt' });
    });

    it('keeps the stored anonymous token when the answer has none', () => {
      cache.save({ key: 'anonymousToken', data: { token: 'earlier' }, expirationMins: 10 });
      const socket = connect();
      socket.receive({ message: 'set user id success', id: 'issued-id' });
      expect(cache.load<{ token: string }>('anonymousToken')).toEqual({ token: 'earlier' });
    });

    it('adopts the id the server registered, not the one the client asked for', () => {
      service['myId'] = 'asked-for';
      const socket = connect();
      socket.receive({ message: 'set user id success', id: 'registered' });
      expect(service['myId']).toBe('registered');
    });

    it('carries on when the server says the login token failed', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
      const socket = connect();
      expect(() => socket.receive({ message: 'auth failed' })).not.toThrow();
      expect(warn).toHaveBeenCalled();
    });
  });

  describe('when the login token changes while connected', () => {
    it('reconnects, so the server learns who the socket is now', () => {
      service.connectSocket().subscribe({ error: () => undefined });
      const socket = fakeSockets[0];
      service['socketAuth']();
      storage.set('token', 'login-jwt');
      service['reconnectIfLoginChanged']();
      expect(socket.disconnect).toHaveBeenCalled();
      expect(socket.connect).toHaveBeenCalled();
    });

    it('notices a logout, which leaves the user id in the store and only flips the logged-in flag', async () => {
      const store = TestBed.inject(MockStore);
      const state: AppState = defaultAppState;
      store.setState({ ...state, auth: { ...state.auth, loggedIn: true } });
      storage.set('token', 'login-jwt');
      service.connectSocket().subscribe({ error: () => undefined });
      const socket = fakeSockets[0];
      service['socketAuth']();
      await effectsRun();
      expect(socket.disconnect).not.toHaveBeenCalled();

      storage.remove('token');
      store.setState({ ...state, auth: { ...state.auth, loggedIn: false } });
      await effectsRun();
      expect(socket.disconnect).toHaveBeenCalled();
      expect(socket.connect).toHaveBeenCalled();
    });

    it('does nothing while the token is the one the socket connected with', () => {
      storage.set('token', 'login-jwt');
      service.connectSocket().subscribe({ error: () => undefined });
      const socket = fakeSockets[0];
      service['socketAuth']();
      service['reconnectIfLoginChanged']();
      expect(socket.disconnect).not.toHaveBeenCalled();
    });

    it('does nothing when the socket is not connected', () => {
      service.connectSocket().subscribe({ error: () => undefined });
      const socket = fakeSockets[0];
      socket.ioSocket.connected = false;
      storage.set('token', 'login-jwt');
      service['reconnectIfLoginChanged']();
      expect(socket.disconnect).not.toHaveBeenCalled();
    });
  });

  describe('the peer token', () => {
    const connect = () => {
      service.connectSocket().subscribe({ error: () => undefined });
      return fakeSockets[fakeSockets.length - 1];
    };

    it('is what the peer registers with, so the peer server can tell this client owns its id', () => {
      const socket = connect();
      socket.receive({ message: 'set user id success', id: 'me', peerToken: 'peer-jwt' });
      service.connectPeerServer();
      expect(fakePeers[0].id).toBe('me');
      expect(fakePeers[0].options.token).toBe('peer-jwt');
    });

    it('is left to PeerJS to make up when a server that predates peer tokens sends none', () => {
      const socket = connect();
      socket.receive({ message: 'set user id success', id: 'me' });
      service.connectPeerServer();
      expect('token' in fakePeers[0].options).toBe(false);
    });

    it('is replaced by a newer one from the server', () => {
      const socket = connect();
      socket.receive({ message: 'set user id success', id: 'me', peerToken: 'first' });
      socket.receive({ message: 'peer token', peerToken: 'second' });
      service.connectPeerServer();
      expect(fakePeers[0].options.token).toBe('second');
    });

    it('is asked for again, and given to the live peer, before the peer reconnects', () => {
      const socket = connect();
      socket.receive({ message: 'set user id success', id: 'me', peerToken: 'first' });
      service.connectPeerServer();
      const peer = fakePeers[0];
      const applied: boolean[] = [];
      service['refreshPeerToken']().subscribe((ok) => applied.push(ok));
      expect(socket.emitted).toContainEqual(['peerToken', undefined]);
      expect(applied).toEqual([]);
      socket.receive({ message: 'peer token', peerToken: 'fresh' });
      expect(applied).toEqual([true]);
      expect(peer._options.token).toBe('fresh');
    });

    it('still lets the peer reconnect when the socket server does not answer in time', () => {
      jest.useFakeTimers();
      try {
        const socket = connect();
        socket.receive({ message: 'set user id success', id: 'me', peerToken: 'first' });
        service.connectPeerServer();
        const applied: boolean[] = [];
        service['refreshPeerToken']().subscribe((ok) => applied.push(ok));
        jest.advanceTimersByTime(3100);
        expect(applied).toEqual([true]);
      } finally {
        jest.useRealTimers();
      }
    });

    it('does not wait for the socket server when the socket is down', () => {
      const socket = connect();
      socket.ioSocket.connected = false;
      const applied: boolean[] = [];
      service['refreshPeerToken']().subscribe((ok) => applied.push(ok));
      expect(applied).toEqual([true]);
      expect(socket.emitted.some(([event]) => event === 'peerToken')).toBe(false);
    });

    it('is not touched for a server that sends no tokens: the live peer keeps its own', () => {
      const socket = connect();
      socket.receive({ message: 'set user id success', id: 'me' });
      service.connectPeerServer();
      fakePeers[0]._options.token = 'made-up-by-peerjs';
      service['refreshPeerToken']().subscribe();
      socket.receive({ message: 'peer token' });
      expect(fakePeers[0]._options.token).toBe('made-up-by-peerjs');
    });
  });

  describe('who a viewer takes captions from', () => {
    // A connection that records its handlers, as PeerJS's DataConnection does
    const fakeConnection = (peer: string) => {
      const handlers = new Map<string, (data?: any) => void>();
      return { peer, close: jest.fn(), send: jest.fn(), removeAllListeners: jest.fn(),
               on: (event: string, handler: (data?: any) => void) => { handlers.set(event, handler); },
               fire: (event: string, data?: any) => handlers.get(event)?.(data) };
    };
    const joinAsViewer = (hostUserId?: string) => {
      service.connectSocket().subscribe({ error: () => undefined });
      service['myBroadcast'] = false;
      fakeSockets[0].receive({ message: 'room joined', room: 'r1', hostUserId });
    };
    let dispatched: jest.SpyInstance;
    beforeEach(() => { dispatched = jest.spyOn(TestBed.inject(MockStore), 'dispatch'); });
    const hostStatuses = () => dispatched.mock.calls.map(([a]) => a).filter((a) => a.type === '[Peer] Set Host Status');

    it('is only the host the server named', () => {
      joinAsViewer('host-id');
      const host = fakeConnection('host-id');
      service['_handlePeerData'](host as never);
      host.fire('data', { response: 'valid' });
      expect(hostStatuses().length).toBe(1);
    });

    it('ignores data from any other peer, who may have registered an id of their own', () => {
      joinAsViewer('host-id');
      const stranger = fakeConnection('someone-else');
      service['_handlePeerData'](stranger as never);
      stranger.fire('data', { response: 'valid' });
      stranger.fire('data', { request: 'hostOffline' });
      expect(hostStatuses().length).toBe(0);
    });

    it('closes a connection from another peer when it opens, and its closing does not mark the host offline', () => {
      joinAsViewer('host-id');
      const stranger = fakeConnection('someone-else');
      service['_handlePeerData'](stranger as never);
      stranger.fire('open');
      expect(stranger.close).toHaveBeenCalled();
      stranger.fire('close');
      expect(hostStatuses().length).toBe(0);
    });

    it('accepts any peer when the server named no host, as before', () => {
      joinAsViewer(undefined);
      const anyone = fakeConnection('whoever');
      service['_handlePeerData'](anyone as never);
      anyone.fire('data', { response: 'valid' });
      expect(hostStatuses().length).toBe(1);
    });

    it('is not applied to a broadcaster, whose peers are its viewers', () => {
      service.connectSocket().subscribe({ error: () => undefined });
      service['myBroadcast'] = true;
      fakeSockets[0].receive({ message: 'room joined', room: 'r1', hostUserId: 'me' });
      const viewer = fakeConnection('a-viewer');
      service['_handlePeerData'](viewer as never);
      viewer.fire('open');
      expect(viewer.close).not.toHaveBeenCalled();
      expect(viewer.send).toHaveBeenCalled();
    });
  });
});
