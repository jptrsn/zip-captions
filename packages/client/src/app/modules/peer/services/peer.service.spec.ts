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
});
