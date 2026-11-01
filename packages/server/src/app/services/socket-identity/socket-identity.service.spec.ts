import { JwtService } from '@nestjs/jwt';
import { SocketIdentityService } from './socket-identity.service';

describe('SocketIdentityService', () => {
  const SECRET = 'unit-test-secret';
  const jwt = new JwtService();
  const saved = { ...process.env };
  let service: SocketIdentityService;
  const login = (claims: object = { sub: 'user-1' }, options: object = {}) => jwt.sign(claims, { secret: SECRET, expiresIn: '1d', ...options });

  beforeEach(() => {
    process.env.JWT_SECRET = SECRET;
    delete process.env.SOCKET_AUTH_MODE;
    service = new SocketIdentityService();
    jest.spyOn(service['logger'], 'warn').mockImplementation(() => undefined);
  });
  afterEach(() => {
    process.env = { ...saved };
    jest.restoreAllMocks();
  });

  describe('resolve', () => {
    it('knows an account by a valid login token', () => {
      expect(service.resolve({ token: login() })).toEqual({ userId: 'user-1', kind: 'account', credentialed: true });
    });

    it('issues a new id and token when nothing is presented, and does not call that a failure', () => {
      const identity = service.resolve(undefined);
      expect(identity).toMatchObject({ kind: 'anonymous', credentialed: false, anonymousToken: expect.any(String) });
      expect(identity.authFailed).toBeUndefined();
      expect(service.resolve({}).userId).not.toBe(identity.userId);
    });

    it('knows an anonymous user again by the token it issued', () => {
      const issued = service.resolve({});
      const again = service.resolve({ anonymousToken: issued.anonymousToken });
      expect(again).toEqual({ userId: issued.userId, kind: 'anonymous', credentialed: true });
    });

    it('prefers the login token over an anonymous one', () => {
      const issued = service.resolve({});
      expect(service.resolve({ token: login(), anonymousToken: issued.anonymousToken }).userId).toBe('user-1');
    });

    it.each([
      ['an expired token', () => login({ sub: 'user-1' }, { expiresIn: '-1h' })],
      ['a token with the wrong signature', () => jwt.sign({ sub: 'user-1' }, { secret: 'other' })],
      ['a token without a subject', () => login({})],
      ['text that is not a token', () => 'nope'],
      ['an unsigned token', () => 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyLTEifQ.'],
    ])('treats %s as not logged in, with a fresh id and a failure flag', (_name, token) => {
      const identity = service.resolve({ token: token() });
      expect(identity).toMatchObject({ kind: 'anonymous', credentialed: false, authFailed: true });
      expect(identity.userId).not.toBe('user-1');
    });

    it('does not accept an anonymous token as a login token', () => {
      const issued = service.resolve({});
      const identity = service.resolve({ token: issued.anonymousToken });
      expect(identity).toMatchObject({ credentialed: false, authFailed: true });
      expect(identity.userId).not.toBe(issued.userId);
    });

    it('does not accept a login token as an anonymous token', () => {
      const identity = service.resolve({ anonymousToken: login() });
      expect(identity).toMatchObject({ credentialed: false, authFailed: true });
      expect(identity.userId).not.toBe('user-1');
    });

    it('does not accept a login token that carries the anonymous audience', () => {
      const identity = service.resolve({ token: login({ sub: 'user-1', aud: 'anonymous-socket' }) });
      expect(identity.credentialed).toBe(false);
    });

    it('cannot be used to pass an anonymous token to the HTTP API', () => {
      const issued = service.resolve({});
      expect(() => jwt.verify(issued.anonymousToken as string, { secret: SECRET })).toThrow();
    });

    it('ignores credentials that are not strings', () => {
      expect(service.resolve({ token: { $ne: null }, anonymousToken: 5 })).toMatchObject({ credentialed: false });
      expect(service.resolve('token').credentialed).toBe(false);
    });

    it('fails when there is no secret to check anything with', () => {
      delete process.env.JWT_SECRET;
      expect(() => service.resolve({})).toThrow('JWT_SECRET');
    });
  });

  describe('mode', () => {
    it.each([[undefined, 'report'], ['', 'report'], ['report', 'report'], ['REPORT', 'report'], ['enforce', 'enforce'], ['Enforce ', 'enforce'], ['enforced', 'enforce'], ['off', 'enforce']])(
      'is read from %p as %s', (value, expected) => {
        if (value === undefined) delete process.env.SOCKET_AUTH_MODE; else process.env.SOCKET_AUTH_MODE = value;
        expect(service.mode()).toBe(expected);
      });
  });

  it('logs a legacy claim with a running count', () => {
    service.recordLegacyClaim('c1', 'u1');
    service.recordLegacyClaim('c2', 'u2');
    expect(service['logger'].warn).toHaveBeenLastCalledWith(expect.stringContaining('#2'));
  });
});
