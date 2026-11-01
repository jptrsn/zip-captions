import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { deriveKey } from '../identity-keys';

/** `report` still lets a peer register without a valid token, and logs it; `enforce` never does */
export type PeerAuthMode = 'report' | 'enforce';

const PEER_AUDIENCE = 'peer-server';
const PEER_KEY_LABEL = 'zip-captions/peer-server/v1';
/** Checked only when a signalling connection is made, so a long session refreshes it before it reconnects */
const PEER_TOKEN_LIFETIME = '1h';

/**
 * Proves who may register a PeerJS id. The socket server issues a token for the id it registered a socket under;
 * the peer server accepts a registration only when the token it carries names that very id. The PeerJS id is the
 * user id, so without this the first party to ask for an id gets it.
 *
 * Peer tokens are signed with their own derived key and audience: they are not login JWTs, socket tokens or
 * anything else, and none of those is a peer token.
 */
@Injectable()
export class PeerIdentityService {
  private readonly logger = new Logger(PeerIdentityService.name);
  private readonly jwt = new JwtService();
  private legacyRegistrations = 0;
  private rejections = 0;

  /** Read on each call so a restart with a different value is the only step to switch stages */
  mode(): PeerAuthMode {
    const configured = (process.env.PEER_AUTH_MODE || '').trim().toLowerCase();
    // Unset means the rollout stage; a value that is set but not understood fails closed
    return !configured || configured === 'report' ? 'report' : 'enforce';
  }

  issue(userId: string): string {
    return this.jwt.sign({ sub: userId }, { secret: deriveKey(PEER_KEY_LABEL), audience: PEER_AUDIENCE, expiresIn: PEER_TOKEN_LIFETIME, algorithm: 'HS256' });
  }

  /** The user id a peer token vouches for, else undefined */
  verify(token: string | null | undefined): string | undefined {
    if (!token) {
      return undefined;
    }
    try {
      const claims = this.jwt.verify<{ sub?: unknown }>(token, { secret: deriveKey(PEER_KEY_LABEL), audience: PEER_AUDIENCE, algorithms: ['HS256'] });
      return typeof claims.sub === 'string' && claims.sub ? claims.sub : undefined;
    } catch {
      return undefined;
    }
  }

  /**
   * Whether the peer server may register `peerId` for a connection that presented `token`. The token is never logged.
   * In `report` mode the answer is yes either way, and the registrations that would be refused are counted.
   */
  allowRegistration(peerId: string | null | undefined, token: string | null | undefined): boolean {
    if (peerId && this.verify(token) === peerId) {
      return true;
    }
    if (this.mode() === 'report') {
      this.legacyRegistrations++;
      this.logger.warn(`legacy peer registration #${this.legacyRegistrations}: id ${peerId ?? '(none)'} has ${token ? 'an invalid' : 'no'} peer token`);
      return true;
    }
    this.rejections++;
    this.logger.warn(`peer registration #${this.rejections} refused: id ${peerId ?? '(none)'} has ${token ? 'an invalid' : 'no'} peer token`);
    return false;
  }
}
