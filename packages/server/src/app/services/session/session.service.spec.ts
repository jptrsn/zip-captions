import { HttpStatus } from '@nestjs/common';
import { model } from 'mongoose';
import { InMemoryCollection } from '../../../testing/in-memory-model';
import { BroadcastSession, BroadcastSessionSchema } from '../../models/broadcast-session.model';
import { OwnerRoom, OwnerRoomSchema } from '../../models/owner-rooms.model';
import { SocketConnection, SocketConnectionSchema } from '../../models/socket-connection.model';
import { SessionService } from './session.service';

const ROOM_ID = /^[acdefghjkmnpqrstuvwxyz2345679]{2}-[acdefghjkmnpqrstuvwxyz2345679]{4}-[acdefghjkmnpqrstuvwxyz2345679]{4}$/;
// The kind of a room is encoded in the parity of its first two characters
const parity = (id: string) => (id.charCodeAt(0) + id.charCodeAt(1)) % 2;

describe('SessionService', () => {
  const SocketModel = model<SocketConnection>('SessionSpecSocket', SocketConnectionSchema);
  const RoomModel = model<OwnerRoom>('SessionSpecRoom', OwnerRoomSchema);
  const BroadcastModel = model<BroadcastSession>('SessionSpecBroadcast', BroadcastSessionSchema);
  let sockets: InMemoryCollection;
  let rooms: InMemoryCollection;
  let broadcasts: InMemoryCollection;
  let cache: Map<string, unknown>;
  let service: SessionService;

  const staticId = () => service.generateRandomRoomId(true);
  const dynamicId = () => service.generateRandomRoomId(false);

  beforeEach(() => {
    sockets = new InMemoryCollection(SocketModel);
    rooms = new InMemoryCollection(RoomModel);
    broadcasts = new InMemoryCollection(BroadcastModel);
    cache = new Map();
    const cacheService = {
      get: jest.fn(async (key: string) => cache.get(key)),
      set: jest.fn(async (key: string, value: unknown) => { cache.set(key, value); }),
    };
    service = new SessionService(SocketModel as never, RoomModel as never, BroadcastModel as never, cacheService as never);
    jest.spyOn(service['logger'], 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    [sockets, rooms, broadcasts].forEach((c) => c.restore());
    jest.restoreAllMocks();
  });

  describe('room ids', () => {
    it('are three groups of letters and digits that avoid look-alike characters', () => {
      for (let i = 0; i < 50; i++) {
        expect(dynamicId()).toMatch(ROOM_ID);
        expect(staticId()).toMatch(ROOM_ID);
      }
    });

    it('tell a static room from a dynamic one by the first two characters', () => {
      const staticParities = new Set(Array.from({ length: 100 }, () => parity(staticId())));
      const dynamicParities = new Set(Array.from({ length: 100 }, () => parity(dynamicId())));
      expect(staticParities.size).toBe(1);
      expect(dynamicParities.size).toBe(1);
      expect([...staticParities][0]).not.toBe([...dynamicParities][0]);
    });

    it('come in tens, of the requested kind', () => {
      const list = service.getRoomIdsList(true);
      expect(list).toHaveLength(10);
      expect(new Set(list.map(parity))).toEqual(new Set([parity(staticId())]));
    });
  });

  describe('knowing which user a client is', () => {
    it('remembers the user for a client in the cache', async () => {
      cache.set('client_to_user_map_c1', 'u1');
      await expect(service.getUserFromClientId('c1')).resolves.toBe('u1');
    });

    it('finds the user from the stored connection, and caches it', async () => {
      sockets.add({ userId: 'u1', clientIds: ['c1'] });
      await expect(service.getUserFromClientId('c1')).resolves.toBe('u1');
      expect(cache.get('client_to_user_map_c1')).toBe('u1');
    });

    it('does not know a client it has never seen', async () => {
      await expect(service.getUserFromClientId('c1')).resolves.toBeUndefined();
    });

    // BUG (found by this spec): getUserIdForNewClientConnection calls setUserId(userId), passing the user id where
    // the client id belongs, so the client is never added to the user's connection. The gateway only calls it for
    // brand-new socket ids, which are never known, so the path is not reached today.
    it.failing('registers a new connection for a known user', async () => {
      sockets.add({ userId: 'u1', clientIds: ['old'] });
      cache.set('client_to_user_map_c1', 'u1');
      await expect(service.getUserIdForNewClientConnection('c1')).resolves.toBe('u1');
      expect(sockets.docs[0]['clientIds']).toEqual(['old', 'c1']);
    });

    it('gives nothing for an unknown client', async () => {
      await expect(service.getUserIdForNewClientConnection('c1')).resolves.toBeUndefined();
    });
  });

  describe('setUserId', () => {
    it('creates a connection for a user seen for the first time and remembers the client', async () => {
      await expect(service.setUserId('c1', 'u1')).resolves.toBe('u1');
      expect(sockets.docs).toHaveLength(1);
      expect(sockets.docs[0]).toMatchObject({ userId: 'u1', clientIds: ['c1'] });
      expect(cache.get('client_to_user_map_c1')).toBe('u1');
    });

    it('adds a new client to the user\'s connection and moves their live broadcast to it', async () => {
      sockets.add({ userId: 'u1', clientIds: ['c1'] });
      broadcasts.add({ roomId: 'r1', hostUserId: 'u1', hostClientId: 'c1' });
      broadcasts.add({ roomId: 'r2', hostUserId: 'u1', hostClientId: 'c1', endTime: new Date() });
      await service.setUserId('c2', 'u1');
      expect(sockets.docs[0]['clientIds']).toEqual(['c1', 'c2']);
      expect(broadcasts.docs.find((b) => b['roomId'] === 'r1')?.['hostClientId']).toBe('c2');
      expect(broadcasts.docs.find((b) => b['roomId'] === 'r2')?.['hostClientId']).toBe('c1');
    });

    it('does not add a client it already has', async () => {
      sockets.add({ userId: 'u1', clientIds: ['c1'] });
      await service.setUserId('c1', 'u1');
      expect(sockets.docs[0]['clientIds']).toEqual(['c1']);
    });
  });

  describe('a client disconnecting', () => {
    it('removes the client from a signed-in user\'s connection and returns that user\'s broadcasts', async () => {
      sockets.add({ userId: 'u1', clientIds: ['c1', 'c2'] });
      broadcasts.add({ roomId: 'r1', hostUserId: 'u1', hostClientId: 'c1' });
      broadcasts.add({ roomId: 'r9', hostUserId: 'other', hostClientId: 'c9' });
      const affected = await service.handleClientDisconnected('c1');
      expect(sockets.docs[0]['clientIds']).toEqual(['c2']);
      expect(affected?.map((b) => b.roomId)).toEqual(['r1']);
    });

    it('returns the broadcasts hosted by a client that belongs to no user', async () => {
      broadcasts.add({ roomId: 'r1', hostUserId: 'x', hostClientId: 'anon' });
      const affected = await service.handleClientDisconnected('anon');
      expect(affected?.map((b) => b.roomId)).toEqual(['r1']);
    });
  });

  describe('getBroadcastSession', () => {
    beforeEach(() => cache.set('client_to_user_map_c1', 'u1'));

    it('refuses a client it cannot place', async () => {
      await expect(service.getBroadcastSession('stranger', { myBroadcast: true })).rejects.toThrow('Cannot determine client user stranger');
    });

    it('refuses a request that is neither hosting nor names a room', async () => {
      await expect(service.getBroadcastSession('c1', {})).rejects.toThrow('No room to join as viewer');
    });

    it('lets a viewer join the live broadcast of a room', async () => {
      broadcasts.add({ roomId: 'r1', hostUserId: 'h', hostClientId: 'hc' });
      const joined = await service.getBroadcastSession('c1', { room: 'r1' });
      expect(joined).toMatchObject({ roomId: 'r1', hostUserId: 'h' });
    });

    it('falls back to the most recently ended broadcast, and to nothing for an unknown room', async () => {
      broadcasts.add({ roomId: 'r1', hostUserId: 'h', hostClientId: 'a', endTime: new Date('2026-01-01') });
      broadcasts.add({ roomId: 'r1', hostUserId: 'h', hostClientId: 'b', endTime: new Date('2026-02-01') });
      expect((await service.getBroadcastSession('c1', { room: 'r1' }))?.hostClientId).toBe('b');
      await expect(service.getBroadcastSession('c1', { room: 'unknown' })).resolves.toBeNull();
    });

    it('creates a throwaway dynamic room and a broadcast for a host with no room', async () => {
      const session = await service.getBroadcastSession('c1', { myBroadcast: true, allowAnonymous: true });
      expect(rooms.docs).toHaveLength(1);
      expect(rooms.docs[0]).toMatchObject({ userId: 'u1', allowAnonymous: true });
      expect(rooms.docs[0]['roomId']).toMatch(ROOM_ID);
      expect(parity(rooms.docs[0]['roomId'] as string)).toBe(parity(dynamicId()));
      expect(session).toMatchObject({ hostUserId: 'u1', hostClientId: 'c1', roomId: rooms.docs[0]['roomId'], allowAnonymous: true });
      expect(session.startTime).toBeInstanceOf(Date);
    });

    it('hosts in the room the user names, and updates who may join', async () => {
      rooms.add({ userId: 'u1', roomId: 'my-room', allowAnonymous: false, isStatic: true });
      const session = await service.getBroadcastSession('c1', { room: 'my-room', myBroadcast: true, allowAnonymous: true });
      expect(rooms.docs).toHaveLength(1);
      expect(rooms.docs[0]['allowAnonymous']).toBe(true);
      expect(session.roomId).toBe('my-room');
    });

    it('continues the live broadcast when the host returns on a new client', async () => {
      rooms.add({ userId: 'u1', roomId: 'my-room', allowAnonymous: true });
      broadcasts.add({ roomId: 'my-room', hostUserId: 'u1', hostClientId: 'old', allowAnonymous: true });
      const session = await service.getBroadcastSession('c1', { room: 'my-room', myBroadcast: true, allowAnonymous: true });
      expect(broadcasts.docs).toHaveLength(1);
      expect(session.hostClientId).toBe('c1');
    });

    it('reuses a host\'s live broadcast with the same setting instead of starting another', async () => {
      rooms.add({ userId: 'u1', roomId: 'r1', allowAnonymous: false });
      broadcasts.add({ roomId: 'r1', hostUserId: 'u1', hostClientId: 'old', allowAnonymous: false });
      await service.getBroadcastSession('c1', { myBroadcast: true, allowAnonymous: false });
      expect(broadcasts.docs).toHaveLength(1);
    });
  });

  describe('ending a broadcast', () => {
    beforeEach(() => cache.set('client_to_user_map_c1', 'u1'));

    it('stamps the end time on the live broadcast of the room', async () => {
      broadcasts.add({ roomId: 'r1', hostUserId: 'u1', hostClientId: 'c1' });
      const ended = await service.endBroadcastSession('c1', { room: 'r1' });
      expect(ended.endTime).toBeInstanceOf(Date);
      expect(broadcasts.docs[0]['endTime']).toBeInstanceOf(Date);
    });

    it('refuses a client it cannot place', async () => {
      await expect(service.endBroadcastSession('stranger', { room: 'r1' })).rejects.toThrow('Cannot determine client user');
    });
  });

  describe('lookups', () => {
    it('lists a user\'s client ids across their connections', async () => {
      sockets.add({ userId: 'u1', clientIds: ['a', 'b'] });
      sockets.add({ userId: 'u2', clientIds: ['z'] });
      await expect(service.findClientIdsByUserId('u1')).resolves.toEqual(['a', 'b']);
    });

    it('finds the broadcast a client hosts, live only if asked', async () => {
      broadcasts.add({ roomId: 'r1', hostUserId: 'u', hostClientId: 'c1', endTime: new Date() });
      expect(await service.findBroadcastSessionsByClientId('c1')).toBeTruthy();
      expect(await service.findBroadcastSessionsByClientId('c1', true)).toBeNull();
    });
  });

  describe('a user\'s rooms', () => {
    it('lists only their rooms, static first and then newest first', async () => {
      rooms.add({ userId: 'u1', roomId: 'old', isStatic: false, createdAt: new Date('2026-01-01') });
      rooms.add({ userId: 'u1', roomId: 'new', isStatic: false, createdAt: new Date('2026-02-01') });
      rooms.add({ userId: 'u1', roomId: 'fixed', isStatic: true, createdAt: new Date('2025-01-01') });
      rooms.add({ userId: 'u2', roomId: 'theirs', isStatic: true });
      const list = await service.findUserRooms('u1');
      expect(list.map((r) => r.roomId)).toEqual(['fixed', 'new', 'old']);
    });

    describe('updateUserRoom', () => {
      it('refuses to change a room with a live broadcast', async () => {
        broadcasts.add({ roomId: 'r1', hostUserId: 'u1', hostClientId: 'c' });
        await expect(service.updateUserRoom('u1', { roomId: 'r1', isStatic: false, allowAnonymous: true })).rejects.toMatchObject({ status: HttpStatus.CONFLICT });
      });

      it('creates a room that does not exist yet', async () => {
        const saved = await service.updateUserRoom('u1', { roomId: 'r1', isStatic: true, allowAnonymous: false });
        expect(saved).toMatchObject({ userId: 'u1', roomId: 'r1', isStatic: true, allowAnonymous: false });
        expect(rooms.docs).toHaveLength(1);
      });

      it('updates a room the user already has', async () => {
        rooms.add({ userId: 'u1', roomId: 'r1', isStatic: true, allowAnonymous: false });
        await service.updateUserRoom('u1', { roomId: 'r1', isStatic: true, allowAnonymous: true });
        expect(rooms.docs).toHaveLength(1);
        expect(rooms.docs[0]['allowAnonymous']).toBe(true);
      });
    });

    describe('updateUserRooms', () => {
      it('refuses while any of the rooms is live', async () => {
        broadcasts.add({ roomId: 'r1', hostUserId: 'u1', hostClientId: 'c' });
        await expect(service.updateUserRooms('u1', [{ roomId: 'r1', isStatic: false, allowAnonymous: true }])).rejects.toMatchObject({ status: HttpStatus.CONFLICT });
      });

      // BUG (found by this spec): generateRandomRoomId(true) makes ids whose prefix _validateRoomForUser then rejects
      // for a static room (the generator and the validator read the parity the opposite way round). updateUserRooms is
      // only reached from a client action that nothing dispatches, so this is not hit today.
      it.failing('saves a static room with a generated static id', async () => {
        const saved = await service.updateUserRooms('u1', [{ roomId: staticId(), isStatic: true, allowAnonymous: true }]);
        expect(saved).toHaveLength(1);
      });

      it('saves a static room whose id has the prefix the validator accepts', async () => {
        // 'a' + 'a' = 194, even: a static room per _validateRoomForUser
        const saved = await service.updateUserRooms('u1', [{ roomId: 'aa-cccc-dddd', isStatic: true, allowAnonymous: true }]);
        expect(saved).toHaveLength(1);
        expect(rooms.docs[0]).toMatchObject({ userId: 'u1', roomId: 'aa-cccc-dddd', isStatic: true });
      });

      it('saves a dynamic room whose id has the other prefix', async () => {
        // 'a' + 'b' = 195, odd: a dynamic room per _validateRoomForUser
        await expect(service.updateUserRooms('u1', [{ roomId: 'ab-cccc-dddd', isStatic: false, allowAnonymous: true }])).resolves.toHaveLength(1);
      });

      it('refuses a room whose id does not match its kind', async () => {
        await expect(service.updateUserRooms('u1', [{ roomId: 'ab-cccc-dddd', isStatic: true, allowAnonymous: true }])).rejects.toMatchObject({ status: HttpStatus.BAD_REQUEST });
        expect(rooms.docs).toHaveLength(0);
      });
    });

    describe('deleteUserRoom', () => {
      it('refuses while a broadcast is live in the room', async () => {
        broadcasts.add({ roomId: 'r1', hostUserId: 'u1', hostClientId: 'c' });
        await expect(service.deleteUserRoom('u1', 'r1')).rejects.toMatchObject({ status: HttpStatus.FORBIDDEN });
      });

      it('answers 404 for a room the user does not have', async () => {
        rooms.add({ userId: 'u2', roomId: 'r1' });
        await expect(service.deleteUserRoom('u1', 'r1')).rejects.toMatchObject({ status: HttpStatus.NOT_FOUND });
        expect(rooms.docs).toHaveLength(1);
      });

      it('deletes the user\'s room', async () => {
        rooms.add({ userId: 'u1', roomId: 'r1' });
        await service.deleteUserRoom('u1', 'r1');
        expect(rooms.docs).toHaveLength(0);
      });
    });
  });

  it('removes everything held about a user, and nothing about anyone else', async () => {
    sockets.add({ userId: 'u1', clientIds: ['a'] });
    sockets.add({ userId: 'u2', clientIds: ['b'] });
    rooms.add({ userId: 'u1', roomId: 'r1' });
    rooms.add({ userId: 'u2', roomId: 'r2' });
    broadcasts.add({ roomId: 'r1', hostUserId: 'u1', hostClientId: 'a' });
    broadcasts.add({ roomId: 'r2', hostUserId: 'u2', hostClientId: 'b' });
    await service.removeUserInformation('u1');
    expect(sockets.docs.map((d) => d['userId'])).toEqual(['u2']);
    expect(rooms.docs.map((d) => d['userId'])).toEqual(['u2']);
    expect(broadcasts.docs.map((d) => d['hostUserId'])).toEqual(['u2']);
  });
});
