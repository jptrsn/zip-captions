import { SessionGateway } from './session.gateway';
import { SessionService } from '../services/session/session.service';

type Mock = jest.Mock;

interface FakeClient {
  id: string;
  send: Mock;
  join: Mock;
  broadcast: { to: Mock };
  emitToRoom: Mock;
}

const fakeClient = (id: string): FakeClient => {
  const emitToRoom = jest.fn();
  return { id, send: jest.fn(), join: jest.fn(), broadcast: { to: jest.fn(() => ({ emit: emitToRoom })) }, emitToRoom };
};

describe('SessionGateway', () => {
  let service: Record<'getUserIdForNewClientConnection' | 'handleClientDisconnected' | 'getUserFromClientId' | 'findUserRooms' | 'getBroadcastSession' | 'findClientIdsByUserId' | 'findBroadcastSessionsByClientId' | 'setUserId' | 'endBroadcastSession', Mock>;
  let gateway: SessionGateway;
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
    gateway = new SessionGateway(service as unknown as SessionService);
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
      service.getBroadcastSession.mockResolvedValue({ roomId: 'r1', hostClientId: 'host' });
      service.getUserFromClientId.mockResolvedValue('viewer-user');
      await gateway.handleJoin(client as never, { room: 'r1' });
      expect(client.join).toHaveBeenCalledWith('r1');
      expect(toEmit).toHaveBeenCalledWith('message', { user: 'viewer-user', message: 'user joined room', room: 'r1', isHost: false });
      expect(client.send).toHaveBeenCalledWith({ user: 'viewer-user', message: 'room joined', room: 'r1' });
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
      expect(client.send).toHaveBeenCalledWith({ message: 'set user id success', id: 'u1' });
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
      expect(client.send).toHaveBeenCalledWith({ message: 'set user id success', id: 'anon-user', isAnonymized: true, roomId: 'live-room' });
    });

    it('ignores the user\'s other clients that are no longer connected', async () => {
      const client = fakeClient('c2');
      service.findClientIdsByUserId.mockResolvedValue(['c1']);
      sockets.set('c1', { id: 'c1', connected: false });
      service.setUserId.mockResolvedValue('u1');
      await gateway.handleSetUserId(client as never, { id: 'u1' });
      expect(service.setUserId).toHaveBeenCalledWith('c2', 'u1');
    });
  });

  describe('endBroadcast', () => {
    it('ends the broadcast for the room and tells viewers when the host ends it', async () => {
      const client = fakeClient('host');
      const endTime = new Date('2026-01-01T00:00:00Z');
      service.endBroadcastSession.mockResolvedValue({ hostUserId: 'u1', endTime });
      service.getUserFromClientId.mockResolvedValue('u1');
      await gateway.handleEndBroadcast(client as never, { room: 'r1' });
      expect(inEmit).toHaveBeenCalledWith('endBroadcast');
      expect(client.emitToRoom).toHaveBeenCalledWith('message', { message: 'broadcast ended', expiredAt: endTime.getTime() });
    });

    it('does not tell viewers when someone other than the host sends it', async () => {
      const client = fakeClient('other');
      service.endBroadcastSession.mockResolvedValue({ hostUserId: 'u1', endTime: new Date() });
      service.getUserFromClientId.mockResolvedValue('u2');
      await gateway.handleEndBroadcast(client as never, { room: 'r1' });
      expect(client.broadcast.to).not.toHaveBeenCalled();
    });
  });
});
