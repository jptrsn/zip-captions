import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import { AddressInfo } from 'net';
import WebSocket from 'ws';
import { JwtService } from '@nestjs/jwt';
import { deriveKey } from '../identity-keys';
import { PeerIdentityService } from '../peer-identity/peer-identity.service';
import { PeerServerService } from './peer-server.service';

/**
 * The real PeerJS server, mounted the way main.ts mounts it, and raw WebSocket clients that speak the PeerJS wire
 * protocol (`/peer-server/peerjs?key&id&token`). It tests who may register a peer id, not how the service is built.
 */
describe('PeerServerService over a real WebSocket (integration)', () => {
  const HOST_ID = 'host-account-id';

  let app: NestExpressApplication;
  let port: number;
  const sockets: WebSocket[] = [];
  const savedEnv = { ...process.env };
  let peerIdentity: PeerIdentityService;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'integration-test-secret';
    process.env.PEER_AUTH_MODE = 'enforce';
    const moduleRef = await Test.createTestingModule({ providers: [PeerServerService, PeerIdentityService] }).compile();
    app = moduleRef.createNestApplication<NestExpressApplication>();
    peerIdentity = app.get(PeerIdentityService);
    app.get(PeerServerService).enablePeerServer(app);
    await app.listen(0);
    port = (app.getHttpServer().address() as AddressInfo).port;
  });

  afterEach(() => {
    sockets.splice(0).forEach((s) => s.terminate());
  });

  afterAll(async () => {
    await app.close();
    process.env = savedEnv;
  });

  /** Opens a PeerJS signalling connection and resolves with the first message the server sends, or 'rejected' */
  function register(id: string, token: string): Promise<string> {
    return new Promise((resolve) => {
      const ws = new WebSocket(`ws://127.0.0.1:${port}/peer-server/peerjs?key=peerjs&id=${id}&token=${token}`);
      sockets.push(ws);
      ws.on('message', (data) => resolve(JSON.parse(data.toString()).type));
      ws.on('unexpected-response', () => resolve('rejected'));
      ws.on('error', () => resolve('rejected'));
      ws.on('close', () => resolve('rejected'));
    });
  }

  it('does not let a stranger register the host\'s peer id while the host is not connected', async () => {
    // The attacker knows the host's user id (it is public) and chooses any token
    expect(await register(HOST_ID, 'attacker-chosen-token')).toBe('rejected');
  });

  it('lets the host register its own peer id even after a stranger tried first', async () => {
    await register(HOST_ID, 'attacker-chosen-token');
    expect(await register(HOST_ID, peerIdentity.issue(HOST_ID))).toBe('OPEN');
  });

  it('does not let a holder of a token for another id register the host\'s id', async () => {
    expect(await register(HOST_ID, peerIdentity.issue('attacker-account-id'))).toBe('rejected');
  });

  it('refuses a registration with no token at all', async () => {
    expect(await register(HOST_ID, '')).toBe('rejected');
  });

  it('refuses an expired peer token', async () => {
    const expired = new JwtService().sign({ sub: HOST_ID }, { secret: deriveKey('zip-captions/peer-server/v1'), audience: 'peer-server', expiresIn: -10, algorithm: 'HS256' });
    expect(await register(HOST_ID, expired)).toBe('rejected');
  });

  it('refuses a login JWT used as a peer token', async () => {
    const login = new JwtService().sign({ sub: HOST_ID }, { secret: process.env.JWT_SECRET, expiresIn: '1d' });
    expect(await register(HOST_ID, login)).toBe('rejected');
  });

  it('lets the same registration reconnect with its token', async () => {
    const token = peerIdentity.issue('reconnecting-host');
    expect(await register('reconnecting-host', token)).toBe('OPEN');
    sockets.splice(0).forEach((s) => s.terminate());
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(await register('reconnecting-host', token)).toBe('OPEN');
  });

  describe('in report mode (the rollout stage before enforcing)', () => {
    beforeEach(() => { process.env.PEER_AUTH_MODE = 'report'; });
    afterEach(() => { process.env.PEER_AUTH_MODE = 'enforce'; });

    it('still lets an old client register without a token, as before', async () => {
      expect(await register('old-client-id', 'random-old-client-token')).toBe('OPEN');
    });
  });
});
