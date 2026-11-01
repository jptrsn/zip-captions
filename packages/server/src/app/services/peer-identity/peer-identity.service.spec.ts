import { JwtService } from '@nestjs/jwt';
import { deriveKey } from '../identity-keys';
import { SocketIdentityService } from '../socket-identity/socket-identity.service';
import { PeerIdentityService } from './peer-identity.service';

describe('PeerIdentityService', () => {
  const SECRET = 'unit-test-secret';
  const jwt = new JwtService();
  const savedEnv = { ...process.env };
  let service: PeerIdentityService;

  beforeEach(() => {
    process.env.JWT_SECRET = SECRET;
    delete process.env.PEER_AUTH_MODE;
    service = new PeerIdentityService();
  });
  afterAll(() => {
    process.env = savedEnv;
  });

  describe('tokens', () => {
    it('verifies a token it issued, to the id it was issued for', () => {
      expect(service.verify(service.issue('user-1'))).toBe('user-1');
    });

    it('rejects an expired token', () => {
      const expired = jwt.sign({ sub: 'user-1' }, { secret: deriveKey('zip-captions/peer-server/v1'), audience: 'peer-server', expiresIn: -10 });
      expect(service.verify(expired)).toBeUndefined();
    });

    it('rejects a token signed with another key', () => {
      expect(service.verify(jwt.sign({ sub: 'user-1' }, { secret: 'other', audience: 'peer-server', expiresIn: '1h' }))).toBeUndefined();
    });

    it('rejects a token for another audience', () => {
      expect(service.verify(jwt.sign({ sub: 'user-1' }, { secret: deriveKey('zip-captions/peer-server/v1'), audience: 'anonymous-socket', expiresIn: '1h' }))).toBeUndefined();
    });

    it('rejects a login JWT', () => {
      expect(service.verify(jwt.sign({ sub: 'user-1' }, { secret: SECRET, expiresIn: '1d' }))).toBeUndefined();
    });

    it('rejects a token without a subject', () => {
      expect(service.verify(jwt.sign({}, { secret: deriveKey('zip-captions/peer-server/v1'), audience: 'peer-server', expiresIn: '1h' }))).toBeUndefined();
    });

    it('rejects nothing, garbage and the empty string', () => {
      expect(service.verify(undefined)).toBeUndefined();
      expect(service.verify('')).toBeUndefined();
      expect(service.verify('not-a-jwt')).toBeUndefined();
    });

    it('is not a token the socket server accepts, or the other way round', () => {
      const socketIdentity = new SocketIdentityService();
      const peerToken = service.issue('user-1');
      expect(socketIdentity.resolve({ token: peerToken, anonymousToken: peerToken }).credentialed).toBe(false);
      const anonymous = socketIdentity.resolve({});
      expect(service.verify(anonymous.anonymousToken)).toBeUndefined();
    });
  });

  describe('mode', () => {
    it.each([[undefined, 'report'], ['', 'report'], ['report', 'report'], [' REPORT ', 'report'], ['enforce', 'enforce'], ['bogus', 'enforce']])(
      'PEER_AUTH_MODE=%p is %s', (value, expected) => {
        if (value === undefined) delete process.env.PEER_AUTH_MODE; else process.env.PEER_AUTH_MODE = value;
        expect(service.mode()).toBe(expected);
      });
  });

  describe('allowRegistration', () => {
    it('accepts a token for exactly that id in both modes', () => {
      for (const mode of ['report', 'enforce']) {
        process.env.PEER_AUTH_MODE = mode;
        expect(service.allowRegistration('user-1', service.issue('user-1'))).toBe(true);
      }
    });

    it('in enforce refuses no token, a bad token and a token for another id', () => {
      process.env.PEER_AUTH_MODE = 'enforce';
      expect(service.allowRegistration('user-1', null)).toBe(false);
      expect(service.allowRegistration('user-1', 'garbage')).toBe(false);
      expect(service.allowRegistration('user-1', service.issue('user-2'))).toBe(false);
      expect(service.allowRegistration(null, service.issue('user-1'))).toBe(false);
    });

    it('in report accepts them all', () => {
      process.env.PEER_AUTH_MODE = 'report';
      expect(service.allowRegistration('user-1', null)).toBe(true);
      expect(service.allowRegistration('user-1', service.issue('user-2'))).toBe(true);
    });
  });
});
