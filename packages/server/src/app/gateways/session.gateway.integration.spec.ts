import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { model } from 'mongoose';
import WebSocket from 'ws';
import { io, Socket as ClientSocket } from 'socket.io-client';
import { InMemoryCollection } from '../../../test/in-memory-model';
import { BroadcastSession, BroadcastSessionSchema } from '../models/broadcast-session.model';
import { OwnerRoom, OwnerRoomSchema } from '../models/owner-rooms.model';
import { SocketConnection, SocketConnectionSchema } from '../models/socket-connection.model';
import { CacheService } from '../services/cache/cache.service';
import { SessionService } from '../services/session/session.service';
import { PeerIdentityService } from '../services/peer-identity/peer-identity.service';
import { PeerServerService } from '../services/peer-server/peer-server.service';
import { SocketIdentityService } from '../services/socket-identity/socket-identity.service';
import { SessionGateway } from './session.gateway';

/**
 * A real socket.io server (the Nest gateway on an ephemeral port) and real socket.io clients, with the real
 * SessionService over the in-memory Mongoose stand-in. It tests what the clients can do to each other, not how
 * the gateway calls the service.
 */
describe('SessionGateway over a real socket (integration)', () => {
  const SocketModel = model<SocketConnection>('GatewayItSocket', SocketConnectionSchema);
  const RoomModel = model<OwnerRoom>('GatewayItRoom', OwnerRoomSchema);
  const BroadcastModel = model<BroadcastSession>('GatewayItBroadcast', BroadcastSessionSchema);
  const SECRET = 'integration-test-secret';
  const HOST = 'host-account-id';

  let app: INestApplication;
  let url: string;
  let sessions: SessionService;
  let collections: InMemoryCollection[];
  let broadcasts: InMemoryCollection;
  let clients: TestClient[];
  const savedEnv = { ...process.env };

  /** A client socket that remembers every `message` it receives */
  class TestClient {
    messages: any[] = [];
    socket: ClientSocket;
    constructor(auth?: Record<string, string>) {
      this.socket = io(url, { auth, transports: ['websocket'], reconnection: false, forceNew: true });
      this.socket.on('message', (m) => this.messages.push(m));
      clients.push(this);
    }
    async connected(): Promise<void> {
      if (!this.socket.connected) await new Promise<void>((resolve, reject) => {
        this.socket.once('connect', () => resolve());
        this.socket.once('connect_error', reject);
      });
    }
    async waitFor(message: string, timeoutMs = 2000): Promise<any> {
      const deadline = Date.now() + timeoutMs;
      while (Date.now() < deadline) {
        const found = this.messages.find((m) => m.message === message);
        if (found) return found;
        await sleep(10);
      }
      throw new Error(`no '${message}' message; got ${JSON.stringify(this.messages.map((m) => m.message))}`);
    }
    has(message: string): boolean {
      return this.messages.some((m) => m.message === message);
    }
    /** Connects, declares the id the way the client app does, and waits for the answer */
    async setId(id: string): Promise<any> {
      await this.connected();
      this.socket.emit('setId', { id });
      return this.waitFor('set user id success');
    }
  }

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const accountToken = (sub: string) => new JwtService().sign({ sub }, { secret: SECRET, expiresIn: '1d' });
  /** Waits until the server has noticed the socket is gone (its disconnect handler is asynchronous) */
  const untilForgotten = async (userId: string) => {
    for (let i = 0; i < 200 && (await sessions.findClientIdsByUserId(userId)).length; i++) await sleep(10);
    expect(await sessions.findClientIdsByUserId(userId)).toEqual([]);
  };
  const liveBroadcast = () => broadcasts.docs.find((d) => d['hostUserId'] === HOST) as any;

  /** The host starts a broadcast and drops off, as in a reconnect or a network blip */
  async function hostBroadcastsThenDrops(): Promise<{ roomId: string; hostClientId: string }> {
    const host = new TestClient({ token: accountToken(HOST) });
    expect((await host.setId(HOST)).id).toBe(HOST);
    host.socket.emit('join', { myBroadcast: true, allowAnonymous: true });
    const { room } = await host.waitFor('room joined');
    const hostClientId = liveBroadcast().hostClientId;
    host.socket.disconnect();
    await untilForgotten(HOST);
    return { roomId: room, hostClientId };
  }

  beforeEach(async () => {
    process.env.JWT_SECRET = SECRET;
    process.env.SOCKET_AUTH_MODE = 'enforce';
    clients = [];
    collections = [new InMemoryCollection(SocketModel), new InMemoryCollection(RoomModel), new InMemoryCollection(BroadcastModel)];
    broadcasts = collections[2];
    const cache = new Map<string, unknown>();
    const cacheService = {
      get: jest.fn(async (key: string) => cache.get(key)),
      set: jest.fn(async (key: string, value: unknown) => { cache.set(key, value); }),
    };
    const moduleRef = await Test.createTestingModule({
      providers: [
        SessionGateway,
        SessionService,
        SocketIdentityService,
        PeerIdentityService,
        PeerServerService,
        { provide: CacheService, useValue: cacheService },
        { provide: getModelToken(SocketConnection.name), useValue: SocketModel },
        { provide: getModelToken(OwnerRoom.name), useValue: RoomModel },
        { provide: getModelToken(BroadcastSession.name), useValue: BroadcastModel },
      ],
    }).compile();
    app = moduleRef.createNestApplication<NestExpressApplication>({ logger: false });
    app.useWebSocketAdapter(new IoAdapter(app));
    // As main.ts does: the real peer server shares the http server with socket.io
    moduleRef.get(PeerServerService).enablePeerServer(app as NestExpressApplication);
    process.env.PEER_AUTH_MODE = 'enforce';
    await app.listen(0);
    url = `http://localhost:${app.getHttpServer().address().port}`;
    sessions = app.get(SessionService);
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(async () => {
    clients.forEach((c) => c.socket.close());
    await app.close();
    collections.forEach((c) => c.restore());
    jest.restoreAllMocks();
    process.env = { ...savedEnv };
  });

  /** Registers on the real peer server the way the PeerJS client does; resolves with the server's first message */
  const registerPeer = (id: string, token: string): Promise<string> => new Promise((resolve) => {
    const ws = new WebSocket(`${url.replace('http', 'ws')}/peer-server/peerjs?key=peerjs&id=${id}&token=${token}`);
    ws.on('message', (data) => { resolve(JSON.parse(data.toString()).type); ws.close(); });
    ws.on('unexpected-response', () => resolve('rejected'));
    ws.on('error', () => resolve('rejected'));
    ws.on('close', () => resolve('rejected'));
  });

  describe('peer identity, end to end', () => {
    it('lets the verified host register its own peer id with the token the socket gave it', async () => {
      const host = new TestClient({ token: accountToken(HOST) });
      const reply = await host.setId(HOST);
      expect(await registerPeer(HOST, reply.peerToken)).toBe('OPEN');
    });

    it('does not let another socket register the host\'s peer id, with or without a token of its own', async () => {
      const attacker = new TestClient();
      const reply = await attacker.setId(HOST);
      expect(reply.id).not.toBe(HOST);
      expect(await registerPeer(HOST, reply.peerToken)).toBe('rejected');
      expect(await registerPeer(HOST, 'attacker-chosen-token')).toBe('rejected');
    });

    it('gives a refreshed token on request that registers as well', async () => {
      const host = new TestClient({ token: accountToken(HOST) });
      await host.setId(HOST);
      host.socket.emit('peerToken');
      const { peerToken } = await host.waitFor('peer token');
      expect(await registerPeer(HOST, peerToken)).toBe('OPEN');
    });
  });

  describe('a client that only knows the host\'s user id', () => {
    it('is not given that id, whatever setId says', async () => {
      await hostBroadcastsThenDrops();
      const attacker = new TestClient();
      const reply = await attacker.setId(HOST);
      expect(reply.id).not.toBe(HOST);
    });

    it('does not receive the host\'s room list', async () => {
      await hostBroadcastsThenDrops();
      const attacker = new TestClient();
      await attacker.setId(HOST);
      attacker.socket.emit('refreshRooms', { userId: HOST });
      await sleep(150);
      expect(attacker.has('set rooms')).toBe(false);
    });

    it('cannot end the host\'s broadcast', async () => {
      const { roomId } = await hostBroadcastsThenDrops();
      const attacker = new TestClient();
      await attacker.setId(HOST);
      attacker.socket.emit('endBroadcast', { room: roomId });
      await sleep(150);
      expect(liveBroadcast().endTime).toBeFalsy();
    });

    it('does not take over the broadcast\'s host client', async () => {
      const { hostClientId } = await hostBroadcastsThenDrops();
      const attacker = new TestClient();
      await attacker.setId(HOST);
      await sleep(150);
      expect(liveBroadcast().hostClientId).toBe(hostClientId);
    });
  });

  describe('the host with a valid token', () => {
    it('gets their id back, keeps their broadcast and can end it', async () => {
      const { roomId } = await hostBroadcastsThenDrops();
      const host = new TestClient({ token: accountToken(HOST) });
      expect((await host.setId(HOST)).id).toBe(HOST);
      expect((await host.waitFor('set rooms')).rooms.map((r: any) => r.roomId)).toContain(roomId);
      expect(liveBroadcast().hostClientId).toBe(host.socket.id);
      host.socket.emit('endBroadcast', { room: roomId });
      for (let i = 0; i < 100 && !liveBroadcast().endTime; i++) await sleep(10);
      expect(liveBroadcast().endTime).toBeTruthy();
    });
  });

  describe('a second tab of a logged-in user', () => {
    it('gets its own anonymous id and cannot end the first tab\'s broadcast', async () => {
      const first = new TestClient({ token: accountToken(HOST) });
      await first.setId(HOST);
      first.socket.emit('join', { myBroadcast: true, allowAnonymous: true });
      const { room } = await first.waitFor('room joined');
      const second = new TestClient({ token: accountToken(HOST) });
      const reply = await second.setId(HOST);
      expect(reply.id).not.toBe(HOST);
      expect(reply.isAnonymized).toBe(true);
      expect(reply.anonymousToken).toBeUndefined();
      second.socket.emit('endBroadcast', { room });
      await sleep(150);
      expect(liveBroadcast().endTime).toBeFalsy();
    });
  });

  describe('an anonymous host', () => {
    it('is given an id and a token, and gets the same id back on reconnect with the token', async () => {
      const first = new TestClient();
      const reply = await first.setId('an-id-the-client-made-up');
      expect(reply.id).not.toBe('an-id-the-client-made-up');
      expect(reply.anonymousToken).toEqual(expect.any(String));
      first.socket.disconnect();
      await untilForgotten(reply.id);

      const second = new TestClient({ anonymousToken: reply.anonymousToken });
      const again = await second.setId('something-else');
      expect(again.id).toBe(reply.id);
      expect(again.anonymousToken).toBeUndefined();
    });

    it('cannot be claimed by naming its id', async () => {
      const first = new TestClient();
      const { id } = await first.setId('x');
      first.socket.disconnect();
      await untilForgotten(id);
      const attacker = new TestClient();
      expect((await attacker.setId(id)).id).not.toBe(id);
    });

    it('is not an account: its token is not accepted as a login token', async () => {
      const first = new TestClient();
      const { id, anonymousToken } = await first.setId('x');
      first.socket.disconnect();
      await untilForgotten(id);
      const attacker = new TestClient({ token: anonymousToken });
      const reply = await attacker.setId(id);
      expect(reply.id).not.toBe(id);
      expect(await attacker.waitFor('auth failed')).toBeTruthy();
    });
  });

  describe('a client with a token that does not verify', () => {
    it.each([
      ['an expired login token', () => new JwtService().sign({ sub: HOST }, { secret: SECRET, expiresIn: '-1h' })],
      ['a login token with the wrong signature', () => new JwtService().sign({ sub: HOST }, { secret: 'not-the-secret' })],
      ['garbage', () => 'not.a.jwt'],
    ])('with %s connects as someone else and is told so', async (_name, makeToken) => {
      await hostBroadcastsThenDrops();
      const client = new TestClient({ token: makeToken() });
      const reply = await client.setId(HOST);
      expect(reply.id).not.toBe(HOST);
      expect(reply.anonymousToken).toEqual(expect.any(String));
      await client.waitFor('auth failed');
    });
  });

  describe('a client that presents no token at all', () => {
    it('does not get an auth failed message', async () => {
      const client = new TestClient();
      await client.setId('x');
      await sleep(100);
      expect(client.has('auth failed')).toBe(false);
    });
  });

  describe('in report mode (the rollout stage)', () => {
    beforeEach(() => { process.env.SOCKET_AUTH_MODE = 'report'; });

    it('still honours an id named without any token, as old clients rely on, and logs it', async () => {
      const record = jest.spyOn(app.get(SocketIdentityService), 'recordLegacyClaim');
      const legacy = new TestClient();
      const reply = await legacy.setId('legacy-user-id');
      expect(reply.id).toBe('legacy-user-id');
      expect(reply.anonymousToken).toBeUndefined();
      expect(record).toHaveBeenCalledWith(legacy.socket.id, 'legacy-user-id');
    });

    it('lets a valid token win over the id named in the message', async () => {
      const client = new TestClient({ token: accountToken(HOST) });
      expect((await client.setId('someone-elses-id')).id).toBe(HOST);
    });
  });
});
