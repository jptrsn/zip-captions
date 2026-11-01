import { HttpException, HttpStatus } from '@nestjs/common';
import { model } from 'mongoose';
import { PassportUserInfo, User, UserDocument, UserSchema } from '../models/user.model';
import { UserService } from './user.service';

const profile = (extra: Partial<PassportUserInfo> = {}): PassportUserInfo => ({ id: 'p1', provider: 'x', email: 'Me@Example.com', firstName: 'Me', lastName: 'Example', accessToken: 't', ...extra });

describe('UserService', () => {
  const UserModel = model<User>('UserServiceSpec', UserSchema);
  let save: jest.SpyInstance;
  let findOne: jest.SpyInstance;
  let deleteOne: jest.SpyInstance;
  let service: UserService;

  const stored = (doc: Partial<User> | null) => doc && new UserModel(doc);
  /** Answers findOne by the field it is asked about, like a small database */
  const database = (users: Partial<User>[]) =>
    findOne.mockImplementation(async (query: Record<string, unknown>) => {
      const hit = users.find((u) => Object.entries(query).every(([k, v]) => (u as Record<string, unknown>)[k] === v));
      return stored(hit ?? null);
    });

  beforeEach(() => {
    save = jest.spyOn(UserModel.prototype, 'save').mockImplementation(function () { return Promise.resolve(this); });
    findOne = jest.spyOn(UserModel, 'findOne');
    deleteOne = jest.spyOn(UserModel, 'deleteOne').mockResolvedValue({ acknowledged: true, deletedCount: 1 } as never);
    service = new UserService(UserModel as never);
  });

  afterEach(() => jest.restoreAllMocks());

  describe('createUser', () => {
    it('stores the email in lower case with a new id', async () => {
      const user = await service.createUser('Me@Example.COM', {});
      expect(user.primaryEmail).toBe('me@example.com');
      expect(user.id).toMatch(/^[0-9a-f-]{36}$/);
      expect(save).toHaveBeenCalled();
    });

    it('keeps the extra fields that have a value and skips the empty ones', async () => {
      const user = await service.createUser('me@example.com', { googleId: 'g1', msId: undefined, patreonId: '' });
      expect(user.googleId).toBe('g1');
      expect(user.msId).toBeUndefined();
      expect(user.patreonId).toBeUndefined();
    });
  });

  describe('updateUser', () => {
    it('applies the update and saves', async () => {
      database([{ id: 'u1', primaryEmail: 'a@b.c' }]);
      const user = await service.updateUser('u1', { syncUiSettings: true });
      expect(user.syncUiSettings).toBe(true);
      expect(save).toHaveBeenCalled();
    });

    it('answers 404 for a user that does not exist', async () => {
      database([]);
      const error = await service.updateUser('nope', { syncUiSettings: true }).catch((e) => e);
      expect(error).toBeInstanceOf(HttpException);
      expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      expect(save).not.toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('deletes the user by id', async () => {
      database([{ id: 'u1', primaryEmail: 'a@b.c' }]);
      await service.deleteUser('u1');
      expect(deleteOne).toHaveBeenCalledWith({ id: 'u1' });
    });

    it('answers 404 and deletes nothing for an unknown user', async () => {
      database([]);
      await expect(service.deleteUser('nope')).rejects.toMatchObject({ status: HttpStatus.NOT_FOUND });
      expect(deleteOne).not.toHaveBeenCalled();
    });
  });

  describe('googleLogin', () => {
    it('fails without a user from Google', async () => {
      await expect(service.googleLogin({})).rejects.toThrow('No user from google');
    });

    it('returns the user already linked to the Google id', async () => {
      database([{ id: 'u1', primaryEmail: 'me@example.com', googleId: 'p1' }]);
      const user = await service.googleLogin({ user: profile() });
      expect(user.id).toBe('u1');
      expect(save).not.toHaveBeenCalled();
    });

    it('links the Google id to an existing account with the same email', async () => {
      database([{ id: 'u1', primaryEmail: 'Me@Example.com' }]);
      const user = await service.googleLogin({ user: profile() });
      expect(user.id).toBe('u1');
      expect(user.googleId).toBe('p1');
      expect(save).toHaveBeenCalledTimes(1);
    });

    it('creates an account for a new email', async () => {
      database([]);
      const user = await service.googleLogin({ user: profile() });
      expect(user.primaryEmail).toBe('me@example.com');
      expect(user.googleId).toBe('p1');
    });
  });

  describe('msLogin', () => {
    it('finds, links or creates by the Microsoft id', async () => {
      database([{ id: 'u1', primaryEmail: 'x@y.z', msId: 'p1' }]);
      expect((await service.msLogin(profile())).id).toBe('u1');
      database([]);
      expect((await service.msLogin(profile())).msId).toBe('p1');
    });
  });

  describe('patreonLogin', () => {
    beforeEach(() => jest.spyOn(console, 'log').mockImplementation(() => undefined));

    it('refreshes the stored refresh token of a returning patron', async () => {
      database([{ id: 'u1', primaryEmail: 'x@y.z', patreonId: 'p1', patreonRefreshToken: 'old' }]);
      const user = await service.patreonLogin(profile({ refreshToken: 'new' }));
      expect(user.patreonRefreshToken).toBe('new');
      expect(save).toHaveBeenCalledTimes(1);
    });

    it('creates an account for a new patron, keeping the refresh token', async () => {
      database([]);
      const user: UserDocument = await service.patreonLogin(profile({ refreshToken: 'tok' }));
      expect(user.patreonId).toBe('p1');
      expect(user.patreonRefreshToken).toBe('tok');
    });
  });
});
