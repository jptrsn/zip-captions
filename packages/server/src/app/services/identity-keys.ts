import { createHmac } from 'crypto';

/** JWT_SECRET, which every identity token key is derived from; throws when it is not set */
export function jwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set; identity tokens cannot be signed or verified');
  }
  return secret;
}

/**
 * A key for one kind of token, derived from JWT_SECRET. Each kind has its own label, so a token of one kind never
 * verifies as another kind, and none of them verifies as the login JWT the HTTP API accepts.
 */
export function deriveKey(label: string): string {
  return createHmac('sha256', jwtSecret()).update(label).digest('hex');
}
