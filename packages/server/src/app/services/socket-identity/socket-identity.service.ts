import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHmac, randomUUID } from 'crypto';

/** `report` still accepts a user id a client merely names in `setId`, and logs it; `enforce` never does */
export type SocketAuthMode = 'report' | 'enforce';

export interface SocketIdentity {
  userId: string;
  kind: 'account' | 'anonymous';
  /** A valid token backed this identity. False for an id the server made up because the client showed nothing valid. */
  credentialed: boolean;
  /** Set only when the server just made this id up: the token the client must present to keep it */
  anonymousToken?: string;
  /** A token was presented but was invalid or expired */
  authFailed?: boolean;
}

const ANONYMOUS_AUDIENCE = 'anonymous-socket';
const ANONYMOUS_KEY_LABEL = 'zip-captions/anonymous-socket/v1';
const ANONYMOUS_LIFETIME = '7d';

/**
 * Decides who a socket is from what the client presents in the handshake `auth` option, never from what it says
 * afterwards. Account users present the login JWT they already use for the HTTP API. Anonymous users present a
 * token this server signed for an id this server generated.
 *
 * Anonymous tokens are signed with a key derived from JWT_SECRET, so they fail the HTTP JwtStrategy: an
 * anonymous id can never become an HTTP principal, and a login JWT is not an anonymous token either.
 */
@Injectable()
export class SocketIdentityService {
  private readonly logger = new Logger(SocketIdentityService.name);
  private readonly jwt = new JwtService();
  private legacyClaims = 0;

  /** Read on each call so a restart with a different value is the only step to switch stages */
  mode(): SocketAuthMode {
    const configured = (process.env.SOCKET_AUTH_MODE || '').trim().toLowerCase();
    // Unset means the rollout stage; a value that is set but not understood fails closed
    return !configured || configured === 'report' ? 'report' : 'enforce';
  }

  resolve(auth: unknown): SocketIdentity {
    const { token, anonymousToken } = this.readAuth(auth);
    let authFailed = false;

    if (token) {
      const userId = this.verify(token, this.accountSecret(), undefined);
      if (userId) {
        return { userId, kind: 'account', credentialed: true };
      }
      authFailed = true;
    }
    if (anonymousToken) {
      const userId = this.verify(anonymousToken, this.anonymousSecret(), ANONYMOUS_AUDIENCE);
      if (userId) {
        return { userId, kind: 'anonymous', credentialed: true, authFailed: authFailed || undefined };
      }
      authFailed = true;
    }
    const userId = randomUUID();
    return { userId, kind: 'anonymous', credentialed: false, anonymousToken: this.issueAnonymousToken(userId), authFailed: authFailed || undefined };
  }

  /** Counts and logs a `setId` that named an id without a credential (report mode only) */
  recordLegacyClaim(clientId: string, claimedId: string): void {
    this.legacyClaims++;
    this.logger.warn(`legacy setId claim #${this.legacyClaims}: client ${clientId} named user ${claimedId} without a valid token`);
  }

  private issueAnonymousToken(userId: string): string {
    return this.jwt.sign({ sub: userId }, { secret: this.anonymousSecret(), audience: ANONYMOUS_AUDIENCE, expiresIn: ANONYMOUS_LIFETIME, algorithm: 'HS256' });
  }

  /** The `sub` of a token that verifies against the key (and audience), else undefined */
  private verify(token: string, secret: string, audience: string | undefined): string | undefined {
    try {
      const claims = this.jwt.verify<{ sub?: unknown; aud?: unknown }>(token, { secret, audience, algorithms: ['HS256'] });
      if (typeof claims.sub !== 'string' || !claims.sub) {
        return undefined;
      }
      // An account token has no audience; one that carries the anonymous audience is not an account token
      if (!audience && claims.aud === ANONYMOUS_AUDIENCE) {
        return undefined;
      }
      return claims.sub;
    } catch {
      return undefined;
    }
  }

  private readAuth(auth: unknown): { token?: string; anonymousToken?: string } {
    const record = auth && typeof auth === 'object' ? (auth as Record<string, unknown>) : {};
    const text = (value: unknown) => (typeof value === 'string' && value ? value : undefined);
    return { token: text(record['token']), anonymousToken: text(record['anonymousToken']) };
  }

  private accountSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not set; socket identities cannot be verified');
    }
    return secret;
  }

  private anonymousSecret(): string {
    return createHmac('sha256', this.accountSecret()).update(ANONYMOUS_KEY_LABEL).digest('hex');
  }
}
