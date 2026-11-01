import { SessionGateway } from './session.gateway';
import { SessionService } from '../services/session/session.service';
import { PeerIdentityService } from '../services/peer-identity/peer-identity.service';
import { SocketIdentity, SocketIdentityService } from '../services/socket-identity/socket-identity.service';

type Mock = jest.Mock;

interface FakeClient {
  id: string;
  send: Mock;
  join: Mock;
  broadcast: { to: Mock };
  emitToRoom: Mock;
  data: { identity: SocketIdentity };
}

/** By default a client that logged in as user `u1`, as the handshake middleware would have established */
const fakeClient = (id: string, identity: Partial<SocketIdentity> = {}): FakeClient => {
  const emitToRoom = jest.fn();
  return {
    id, send: jest.fn(), join: jest.fn(), broadcast: { to: jest.fn(() => ({ emit: emitToRoom })) }, emitToRoom,
    data: { identity: { userId: 'u1', kind: 'account', credentialed: true, ...identity } },
  };
};

describe('SessionGateway', () => {
  let service: Record<'getUserIdForNewClientConnection' | 'handleClientDisconnected' | 'getUserFromClientId' | 'findUserRooms' | 'getBroadcastSession' | 'findClientIdsByUserId' | 'findBroadcastSessionsByClientId' | 'setUserId' | 'endBroadcastSession', Mock>;
  let gateway: SessionGateway;
  let identityService: SocketIdentityService;
  let peerIdentity: PeerIdentityService;
  let toEmit: Mock;
  let inEmit: Mock;
  let sockets: Map<string, { id: string; connected: boolean }>;
  let roomMembers: Map<string, Set<string>>;

  beforeEach(() => {
    service = {
      getUserIdForNewClientConnection: jest.fn(),
      handleClientDisconnected: jest.fn(),
      getUserFromClientId: jest.fn(),
      findUserRooms: jest.fn().mockResolvedValue([]),
      getBroadcastSession: jest.fn(),
      findClientIdsByUserId: jest.fn().mockResolvedValue([]),
      findBroadcastSessionsByClientId: jest.fn(),
      setUserId: jest.fn(),
      endBroadcastSession: jest.fn(),
    };
    process.env.JWT_SECRET = 'gateway-unit-secret';
    delete process.env.SOCKET_AUTH_MODE;
    identityService = new SocketIdentityService();
    jest.spyOn(identityService['logger'], 'warn').mockImplementation(() => undefined);
    peerIdentity = new PeerIdentityService();
    gateway = new SessionGateway(service as unknown as SessionService, identityService, peerIdentity);
    toEmit = jest.fn();
    inEmit = jest.fn();
    sockets = new Map();
    roomMembers = new Map();
    gateway.server = {
      to: jest.fn(() => ({ emit: toEmit })),
      in: jest.fn(() => ({ emit: inEmit })),
      sockets: { sockets, adapter: { rooms: roomMembers } },
    } as never;
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(gateway['logger'], 'log').mockImplementation(() => undefined);
    jest.spyOn(gateway['logger'], 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => jest.restoreAllMocks());

  describe('connecting', () => {
    it('tells a client which user it is when the service knows', async () => {
      const client = fakeClient('c1');
      service.getUserIdForNewClientConnection.mockResolvedValue('u1');
      await gateway.handleConnection(client as never);
      expect(client.send).toHaveBeenCalledWith({ message: 'set user id', id: 'u1' });
    });

    it('says nothing to a client it does not know', async () => {
      const client = fakeClient('c1');
      await gateway.handleConnection(client as never);
      expect(client.send).not.toHaveBeenCalled();
    });
  });

  describe('disconnecting', () => {
    it('tells the rooms of the broadcasts the client was hosting that the host left', async () => {
      const client = fakeClient('c1');
      service.handleClientDisconnected.mockResolvedValue([{ roomId: 'r1', hostUserId: 'u1' }, { roomId: 'r2', hostUserId: 'u1' }]);
      await gateway.handleDisconnect(client as never);
      expect(client.broadcast.to).toHaveBeenCalledWith('r1');
      expect(client.broadcast.to).toHaveBeenCalledWith('r2');
      expect(client.emitToRoom).toHaveBeenCalledWith('message', { user: 'u1', message: 'user left room', room: 'r1' });
    });

    it('does nothing when there were no broadcasts', async () => {
      const client = fakeClient('c1');
      service.handleClientDisconnected.mockResolvedValue(null);
      await gateway.handleDisconnect(client as never);
      expect(client.broadcast.to).not.toHaveBeenCalled();
    });
  });

  describe('refreshRooms', () => {
    it('sends a user their rooms', async () => {
      const client = fakeClient('c1');
      service.getUserFromClientId.mockResolvedValue('u1');
      service.findUserRooms.mockResolvedValue([{ roomId: 'r1' }]);
      await gateway.handleRefreshRooms(client as never, { userId: 'u1' });
      expect(client.send).toHaveBeenCalledWith({ message: 'set rooms', rooms: [{ roomId: 'r1' }] });
    });

    it('does not send one user\'s rooms to a client that is another user', async () => {
      const client = fakeClient('c1');
      service.getUserFromClientId.mockResolvedValue('someone-else');
      await gateway.handleRefreshRooms(client as never, { userId: 'u1' });
      expect(client.send).not.toHaveBeenCalled();
      expect(service.findUserRooms).not.toHaveBeenCalled();
    });
  });

  describe('join', () => {
    it('tells the client the broadcast expired when there is none', async () => {
      const client = fakeClient('c1');
      service.getBroadcastSession.mockResolvedValue(null);
      await gateway.handleJoin(client as never, { room: 'r1' });
      expect(client.send).toHaveBeenCalledWith({ message: 'broadcast expired', expiredAt: -1 });
      expect(client.join).not.toHaveBeenCalled();
    });

    it('tells the client when the broadcast has ended, without letting it join', async () => {
      const client = fakeClient('c1');
      const endTime = new Date('2026-01-01T00:00:00Z');
      service.getBroadcastSession.mockResolvedValue({ roomId: 'r1', hostClientId: 'h', endTime, allowAnonymous: true });
      await gateway.handleJoin(client as never, { room: 'r1' });
      expect(client.send).toHaveBeenCalledWith({ message: 'broadcast expired', expiredAt: endTime.getTime(), allowAnonymous: true });
      expect(client.join).not.toHaveBeenCalled();
    });

    it('lets a viewer join the room and tells the host', async () => {
      const client = fakeClient('viewer');
      service.getBroadcastSession.mockResolvedValue({ roomId: 'r1', hostClientId: 'host', hostUserId: 'host-user' });
      service.getUserFromClientId.mockResolvedValue('viewer-user');
      await gateway.handleJoin(client as never, { room: 'r1' });
      expect(client.join).toHaveBeenCalledWith('r1');
      expect(toEmit).toHaveBeenCalledWith('message', { user: 'viewer-user', message: 'user joined room', room: 'r1', isHost: false });
      expect(client.send).toHaveBeenCalledWith({ user: 'viewer-user', message: 'room joined', room: 'r1', hostUserId: 'host-user' });
    });

    it('announces a viewer to the whole room when the host is unknown', async () => {
      const client = fakeClient('viewer');
      service.getBroadcastSession.mockResolvedValue({ roomId: 'r1', hostClientId: undefined });
      service.getUserFromClientId.mockResolvedValue('viewer-user');
      await gateway.handleJoin(client as never, { room: 'r1' });
      expect(toEmit).not.toHaveBeenCalled();
      expect(client.emitToRoom).toHaveBeenCalledWith('message', expect.objectContaining({ message: 'user joined room', isHost: false }));
    });

    it('tells a returning host which viewers to reconnect to', async () => {
      const host = fakeClient('host');
      service.getBroadcastSession.mockResolvedValue({ roomId: 'r1', hostClientId: 'host' });
      service.getUserFromClientId.mockImplementation(async (id: string) => ({ host: 'host-user', v1: 'viewer-1', v2: 'viewer-2' } as Record<string, string>)[id]);
      ['v1', 'v2', 'host'].forEach((id) => sockets.set(id, { id, connected: true }));
      roomMembers.set('r1', new Set(['v1', 'v2', 'host']));
      await gateway.handleJoin(host as never, { room: 'r1', myBroadcast: true });
      expect(host.send).toHaveBeenCalledWith({ message: 'connect clients', clients: ['viewer-1', 'viewer-2'] });
      expect(toEmit).not.toHaveBeenCalled();
    });

    it('leaves out viewers whose user is unknown, and sends nothing when no one is left', async () => {
      const host = fakeClient('host');
      service.getBroadcastSession.mockResolvedValue({ roomId: 'r1', hostClientId: 'host' });
      service.getUserFromClientId.mockImplementation(async (id: string) => (id === 'host' ? 'host-user' : undefined));
      ['v1', 'host'].forEach((id) => sockets.set(id, { id, connected: true }));
      roomMembers.set('r1', new Set(['v1', 'host']));
      await gateway.handleJoin(host as never, { room: 'r1', myBroadcast: true });
      expect(host.send).not.toHaveBeenCalledWith(expect.objectContaining({ message: 'connect clients' }));
    });
  });

  describe('setId', () => {
    it('registers the client for the user and sends the user their rooms', async () => {
      const client = fakeClient('c1');
      service.setUserId.mockResolvedValue('u1');
      service.findUserRooms.mockResolvedValue([{ roomId: 'r1' }]);
      await gateway.handleSetUserId(client as never, { id: 'u1' });
      expect(service.setUserId).toHaveBeenCalledWith('c1', 'u1');
      expect(client.send).toHaveBeenCalledWith({ message: 'set user id success', id: 'u1', peerToken: expect.any(String) });
      expect(client.send).toHaveBeenCalledWith({ message: 'set rooms', rooms: [{ roomId: 'r1' }] });
    });

    it('sends no rooms for a user with none', async () => {
      const client = fakeClient('c1');
      service.setUserId.mockResolvedValue('u1');
      await gateway.handleSetUserId(client as never, { id: 'u1' });
      expect(client.send).toHaveBeenCalledTimes(1);
    });

    it('treats the client as anonymous when the same user is already connected elsewhere, and says which room is live', async () => {
      const client = fakeClient('c2');
      service.findClientIdsByUserId.mockResolvedValue(['c1']);
      sockets.set('c1', { id: 'c1', connected: true });
      service.findBroadcastSessionsByClientId.mockResolvedValue({ roomId: 'live-room' });
      service.setUserId.mockResolvedValue('anon-user');
      await gateway.handleSetUserId(client as never, { id: 'u1' });
      expect(service.findBroadcastSessionsByClientId).toHaveBeenCalledWith('c1', true);
      expect(service.setUserId).toHaveBeenCalledWith('c2');
      expect(client.send).toHaveBeenCalledWith({ message: 'set user id success', id: 'anon-user', isAnonymized: true, roomId: 'live-room', peerToken: expect.any(String) });
    });

    it('ignores the user\'s other clients that are no longer connected', async () => {
      const client = fakeClient('c2');
      service.findClientIdsByUserId.mockResolvedValue(['c1']);
      sockets.set('c1', { id: 'c1', connected: false });
      service.setUserId.mockResolvedValue('u1');
      await gateway.handleSetUserId(client as never, { id: 'u1' });
      expect(service.setUserId).toHaveBeenCalledWith('c2', 'u1');
    });

    describe('the id in the message', () => {
      it('is ignored when the client is a verified user: the verified id is registered and echoed', async () => {
        const client = fakeClient('c1', { userId: 'me' });
        service.setUserId.mockResolvedValue('me');
        await gateway.handleSetUserId(client as never, { id: 'someone-else' });
        expect(service.setUserId).toHaveBeenCalledWith('c1', 'me');
        expect(client.send).toHaveBeenCalledWith({ message: 'set user id success', id: 'me', peerToken: expect.any(String) });
        expect(service.findUserRooms).not.toHaveBeenCalledWith('someone-else');
      });

      it('is ignored in report mode too when the client showed a valid token', async () => {
        process.env.SOCKET_AUTH_MODE = 'report';
        const client = fakeClient('c1', { userId: 'me' });
        service.setUserId.mockResolvedValue('me');
        await gateway.handleSetUserId(client as never, { id: 'someone-else' });
        expect(service.setUserId).toHaveBeenCalledWith('c1', 'me');
      });

      describe('from a client with no valid token', () => {
        const anonymous = { userId: 'issued', kind: 'anonymous' as const, credentialed: false, anonymousToken: 'tok' };

        it('is ignored in enforce mode: the client gets the id and token the server issued', async () => {
          process.env.SOCKET_AUTH_MODE = 'enforce';
          const client = fakeClient('c1', anonymous);
          service.setUserId.mockResolvedValue('issued');
          await gateway.handleSetUserId(client as never, { id: 'victim' });
          expect(service.setUserId).toHaveBeenCalledWith('c1', 'issued');
          expect(service.findUserRooms).toHaveBeenCalledWith('issued');
          expect(client.send).toHaveBeenCalledWith({ message: 'set user id success', id: 'issued', anonymousToken: 'tok', peerToken: expect.any(String) });
        });

        it('is honoured and counted in report mode, with no token for an id the server did not issue', async () => {
          process.env.SOCKET_AUTH_MODE = 'report';
          const record = jest.spyOn(identityService, 'recordLegacyClaim');
          const client = fakeClient('c1', anonymous);
          service.setUserId.mockResolvedValue('legacy');
          await gateway.handleSetUserId(client as never, { id: 'legacy' });
          expect(record).toHaveBeenCalledWith('c1', 'legacy');
          expect(service.setUserId).toHaveBeenCalledWith('c1', 'legacy');
          expect(client.send).toHaveBeenCalledWith({ message: 'set user id success', id: 'legacy' });
        });

        it('fails closed when the mode is not understood', async () => {
          process.env.SOCKET_AUTH_MODE = 'enforced';
          const client = fakeClient('c1', anonymous);
          service.setUserId.mockResolvedValue('issued');
          await gateway.handleSetUserId(client as never, { id: 'victim' });
          expect(service.setUserId).toHaveBeenCalledWith('c1', 'issued');
        });
      });

      it('does not register a client that has no established identity', async () => {
        const client = fakeClient('c1');
        (client as { data: unknown }).data = {};
        await gateway.handleSetUserId(client as never, { id: 'u1' });
        expect(service.setUserId).not.toHaveBeenCalled();
        expect(client.send).not.toHaveBeenCalled();
      });

      it('does not tell a report-mode claimant which room the claimed user has live', async () => {
        process.env.SOCKET_AUTH_MODE = 'report';
        const client = fakeClient('c2', { userId: 'issued', kind: 'anonymous', credentialed: false });
        service.findClientIdsByUserId.mockResolvedValue(['c1']);
        sockets.set('c1', { id: 'c1', connected: true });
        service.findBroadcastSessionsByClientId.mockResolvedValue({ roomId: 'live-room' });
        service.setUserId.mockResolvedValue('anon-user');
        await gateway.handleSetUserId(client as never, { id: 'victim' });
        expect(service.findBroadcastSessionsByClientId).not.toHaveBeenCalled();
        expect(client.send).toHaveBeenCalledWith({ message: 'set user id success', id: 'anon-user', isAnonymized: true, roomId: undefined, peerToken: expect.any(String) });
      });

      describe('the peer token', () => {
        it('vouches for the registered id, for a verified user', async () => {
          const client = fakeClient('c1', { userId: 'me' });
          service.setUserId.mockResolvedValue('me');
          await gateway.handleSetUserId(client as never, {});
          const sent = client.send.mock.calls.map(([m]) => m).find((m) => m.message === 'set user id success');
          expect(peerIdentity.verify(sent.peerToken)).toBe('me');
        });

        it('vouches for the second tab\'s own fresh id, not the id the tab asked for', async () => {
          const client = fakeClient('c2', { userId: 'u1' });
          service.findClientIdsByUserId.mockResolvedValue(['c1']);
          sockets.set('c1', { id: 'c1', connected: true });
          service.setUserId.mockResolvedValue('anon-user');
          await gateway.handleSetUserId(client as never, {});
          const sent = client.send.mock.calls.map(([m]) => m).find((m) => m.message === 'set user id success');
          expect(peerIdentity.verify(sent.peerToken)).toBe('anon-user');
        });

        it('is never issued for an id a report-mode client merely named', async () => {
          process.env.SOCKET_AUTH_MODE = 'report';
          const client = fakeClient('c1', { userId: 'issued', kind: 'anonymous', credentialed: false });
          service.setUserId.mockResolvedValue('victim');
          await gateway.handleSetUserId(client as never, { id: 'victim' });
          expect(client.send).toHaveBeenCalledWith(expect.not.objectContaining({ peerToken: expect.anything() }));
        });
      });

      it('is not issued when a report-mode claimant asks again and is handed the id it named', async () => {
        process.env.SOCKET_AUTH_MODE = 'report';
        const client = fakeClient('c1', { userId: 'issued', kind: 'anonymous', credentialed: false });
        service.setUserId.mockResolvedValue('victim');
        await gateway.handleSetUserId(client as never, { id: 'victim' });
        // The second request finds the claimant's own socket registered under the id, so it is treated as a second tab,
        // and the service hands back the id this socket already holds
        service.findClientIdsByUserId.mockResolvedValue(['c1']);
        sockets.set('c1', { id: 'c1', connected: true });
        client.send.mockClear();
        await gateway.handleSetUserId(client as never, {});
        expect(client.send).toHaveBeenCalledWith(expect.not.objectContaining({ peerToken: expect.anything() }));
        service.getUserFromClientId.mockResolvedValue('victim');
        await gateway.handlePeerToken(client as never);
        expect(client.send).not.toHaveBeenCalledWith(expect.objectContaining({ message: 'peer token' }));
      });

      it('does not hand a second tab a token, since its anonymous id lasts only as long as the socket', async () => {
        const client = fakeClient('c2', { userId: 'u1', anonymousToken: 'tok' });
        service.findClientIdsByUserId.mockResolvedValue(['c1']);
        sockets.set('c1', { id: 'c1', connected: true });
        service.setUserId.mockResolvedValue('anon-user');
        await gateway.handleSetUserId(client as never, {});
        expect(client.send).toHaveBeenCalledWith(expect.not.objectContaining({ anonymousToken: expect.anything() }));
      });
    });
  });

  describe('peerToken', () => {
    it('sends a fresh token for the id the socket is registered under', async () => {
      const client = fakeClient('c1');
      service.getUserFromClientId.mockResolvedValue('me');
      await gateway.handlePeerToken(client as never);
      const sent = client.send.mock.calls[0][0];
      expect(sent.message).toBe('peer token');
      expect(peerIdentity.verify(sent.peerToken)).toBe('me');
    });

    it('sends nothing to a socket that has no registered user', async () => {
      const client = fakeClient('c1');
      service.getUserFromClientId.mockResolvedValue(null);
      await gateway.handlePeerToken(client as never);
      expect(client.send).not.toHaveBeenCalled();
    });

    it('sends nothing to a report-mode client that was registered under an id it merely named', async () => {
      process.env.SOCKET_AUTH_MODE = 'report';
      const client = fakeClient('c1', { userId: 'issued', kind: 'anonymous', credentialed: false });
      service.setUserId.mockResolvedValue('victim');
      await gateway.handleSetUserId(client as never, { id: 'victim' });
      client.send.mockClear();
      service.getUserFromClientId.mockResolvedValue('victim');
      await gateway.handlePeerToken(client as never);
      expect(client.send).not.toHaveBeenCalled();
    });
  });

  describe('the handshake', () => {
    it('establishes identity in a middleware, and refuses the connection only when identity cannot be established', () => {
      let middleware!: (socket: unknown, next: (err?: Error) => void) => void;
      gateway.afterInit({ use: (fn: typeof middleware) => { middleware = fn; } } as never);
      jest.spyOn(identityService, 'resolve').mockReturnValueOnce({ userId: 'u1', kind: 'account', credentialed: true });
      const socket = { id: 's1', data: {} as Record<string, unknown>, handshake: { auth: { token: 't' } } };
      const next = jest.fn();
      middleware(socket, next);
      expect(identityService.resolve).toHaveBeenCalledWith({ token: 't' });
      expect(socket.data['identity']).toMatchObject({ userId: 'u1' });
      expect(next).toHaveBeenCalledWith();

      jest.spyOn(gateway['logger'], 'error').mockImplementation(() => undefined);
      jest.spyOn(identityService, 'resolve').mockImplementationOnce(() => { throw new Error('JWT_SECRET is not set'); });
      const refused = jest.fn();
      middleware({ id: 's2', data: {}, handshake: { auth: {} } }, refused);
      expect(refused).toHaveBeenCalledWith(expect.any(Error));
    });

    it('tells a client whose token failed, once connected', async () => {
      const client = fakeClient('c1', { credentialed: false, authFailed: true });
      await gateway.handleConnection(client as never);
      expect(client.send).toHaveBeenCalledWith({ message: 'auth failed' });
    });

    it('says nothing to a client that presented no token or a valid one', async () => {
      const client = fakeClient('c1');
      await gateway.handleConnection(client as never);
      expect(client.send).not.toHaveBeenCalledWith({ message: 'auth failed' });
    });
  });

  describe('endBroadcast', () => {
    it('ends the broadcast for the room and tells viewers when the host ends it', async () => {
      const client = fakeClient('host');
      const endTime = new Date('2026-01-01T00:00:00Z');
      service.endBroadcastSession.mockResolvedValue({ hostUserId: 'u1', endTime });
      await gateway.handleEndBroadcast(client as never, { room: 'r1' });
      expect(inEmit).toHaveBeenCalledWith('endBroadcast');
      expect(client.emitToRoom).toHaveBeenCalledWith('message', { message: 'broadcast ended', expiredAt: endTime.getTime() });
    });

    it('does nothing, and does not fail, when there is no live broadcast to end', async () => {
      const client = fakeClient('host');
      service.endBroadcastSession.mockResolvedValue(null);
      await expect(gateway.handleEndBroadcast(client as never, { room: 'r1' })).resolves.toBeUndefined();
      expect(inEmit).not.toHaveBeenCalled();
      expect(client.broadcast.to).not.toHaveBeenCalled();
    });

    it('passes on the failure, and neither tells the room nor answers the client, for a client with no known user', async () => {
      const client = fakeClient('stranger');
      service.endBroadcastSession.mockRejectedValue(new Error('Cannot determine client user stranger'));
      await expect(gateway.handleEndBroadcast(client as never, { room: 'r1' })).rejects.toThrow('Cannot determine client user');
      expect(inEmit).not.toHaveBeenCalled();
      expect(client.send).not.toHaveBeenCalled();
      expect(client.broadcast.to).not.toHaveBeenCalled();
    });
  });
});
