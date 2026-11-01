import { Logger } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Wrap the real timingSafeEqual so a test can see it being used
jest.mock('node:crypto', () => {
  const actual = jest.requireActual('node:crypto');
  return { ...actual, timingSafeEqual: jest.fn(actual.timingSafeEqual) };
});

describe('AppController patreon webhook', () => {
  const secret = 'webhook-secret';
  const body = { data: { type: 'member' }, included: [] };
  const rawBody = Buffer.from(JSON.stringify(body));
  const sign = (raw: Buffer, key = secret) => createHmac('md5', key).update(raw).digest('hex');
  let service: Record<'upsertMember' | 'markMemberDeleted' | 'createPledge' | 'updatePledge' | 'deletePledge', jest.Mock>;
  let controller: AppController;
  let error: jest.SpyInstance;
  let warn: jest.SpyInstance;
  const env = { ...process.env };

  const call = (headers: Record<string, string | undefined>, raw: Buffer = rawBody, payload: unknown = body) =>
    controller.updatePatreonSupporters({ rawBody: raw } as never, headers, payload);
  const signed = (event: string) => ({ 'x-patreon-event': event, 'x-patreon-signature': sign(rawBody) });
  const called = () => Object.entries(service).filter(([, fn]) => fn.mock.calls.length).map(([name]) => name);

  beforeEach(() => {
    // In Jest 29.5, restoreAllMocks (afterEach) also strips the implementation of a jest.fn made in a jest.mock
    // factory, although the documentation says it only restores spies (checked: the wrapper returns undefined in the
    // next test), so put the real one back
    (timingSafeEqual as unknown as jest.Mock).mockImplementation(jest.requireActual('node:crypto').timingSafeEqual);
    service = { upsertMember: jest.fn(), markMemberDeleted: jest.fn(), createPledge: jest.fn(), updatePledge: jest.fn(), deletePledge: jest.fn() };
    process.env['PATREON_SUPPORTER_WEBHOOK_SECRET'] = secret;
    warn = jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => undefined);
    controller = new AppController(service as unknown as AppService);
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    process.env = { ...env };
  });

  it.each([
    ['members:create', 'upsertMember'],
    ['members:update', 'upsertMember'],
    ['members:delete', 'markMemberDeleted'],
    ['members:pledge:create', 'createPledge'],
    ['members:pledge:update', 'updatePledge'],
    ['members:pledge:delete', 'deletePledge'],
  ])('sends a correctly signed %s event to %s with the body', async (event, method) => {
    await call(signed(event));
    expect(called()).toEqual([method]);
    expect(service[method as keyof typeof service]).toHaveBeenCalledWith(body);
  });

  it('does nothing for an event it does not know', async () => {
    await call(signed('members:something:else'));
    expect(called()).toEqual([]);
  });

  it.each([
    ['no event', { 'x-patreon-signature': sign(rawBody) }],
    ['no signature', { 'x-patreon-event': 'members:create' }],
  ])('ignores a request with %s', async (_name, headers) => {
    await call(headers);
    expect(called()).toEqual([]);
    expect(error).toHaveBeenCalled();
  });

  it('ignores every request when no secret is configured', async () => {
    delete process.env['PATREON_SUPPORTER_WEBHOOK_SECRET'];
    await call(signed('members:create'));
    expect(called()).toEqual([]);
  });

  it('ignores a request signed with another secret', async () => {
    await call({ 'x-patreon-event': 'members:create', 'x-patreon-signature': sign(rawBody, 'other') });
    expect(called()).toEqual([]);
  });

  it('ignores a request whose body was changed after signing', async () => {
    await call(signed('members:create'), Buffer.from('{"data":{"type":"member"},"x":1}'));
    expect(called()).toEqual([]);
  });

  it('answers normally, and logs, when handling fails, so Patreon does not keep retrying a bad payload', async () => {
    service.upsertMember.mockRejectedValue(new Error('bad payload'));
    await expect(call(signed('members:create'))).resolves.toBeUndefined();
    expect(error).toHaveBeenCalledWith(expect.objectContaining({ message: 'bad payload' }));
  });

  describe('the signature check', () => {
    const sendWith = (signature: string) => call({ 'x-patreon-event': 'members:create', 'x-patreon-signature': signature });

    it('compares the signature in constant time', async () => {
      const compare = timingSafeEqual as unknown as jest.Mock;
      compare.mockClear();
      await sendWith(sign(rawBody));
      expect(compare).toHaveBeenCalledTimes(1);
      expect(compare.mock.calls[0][0]).toHaveLength(16);
      expect(compare.mock.calls[0][1]).toHaveLength(16);
      expect(called()).toEqual(['upsertMember']);
    });

    it('accepts the right signature in upper case hex', async () => {
      await sendWith(sign(rawBody).toUpperCase());
      expect(called()).toEqual(['upsertMember']);
    });

    it.each([
      ['empty', ''],
      ['too short', sign(rawBody).slice(0, 30)],
      ['too long', sign(rawBody) + '00'],
      ['not hex', 'z'.repeat(32)],
      ['the right signature followed by something else', sign(rawBody) + 'zzzz'],
      ['the right signature with a space in it', sign(rawBody).slice(0, 10) + ' ' + sign(rawBody).slice(11)],
    ])('rejects a signature that is %s, without failing', async (_name, signature) => {
      await expect(sendWith(signature)).resolves.toBeUndefined();
      expect(called()).toEqual([]);
    });
  });

  describe('start-up', () => {
    it('does not warn when the webhook secret is set', () => {
      warn.mockClear();
      new AppController(service as unknown as AppService);
      expect(warn).not.toHaveBeenCalled();
    });

    it('warns loudly when the webhook secret is not set, since every Patreon webhook will then be ignored', () => {
      delete process.env['PATREON_SUPPORTER_WEBHOOK_SECRET'];
      warn.mockClear();
      new AppController(service as unknown as AppService);
      expect(warn).toHaveBeenCalledTimes(1);
      expect(String(warn.mock.calls[0][0])).toContain('PATREON_SUPPORTER_WEBHOOK_SECRET');
      expect(String(warn.mock.calls[0][0])).toMatch(/ignored/i);
    });

    it('treats an empty secret as not set', () => {
      process.env['PATREON_SUPPORTER_WEBHOOK_SECRET'] = '';
      warn.mockClear();
      new AppController(service as unknown as AppService);
      expect(warn).toHaveBeenCalledTimes(1);
    });
  });
});
