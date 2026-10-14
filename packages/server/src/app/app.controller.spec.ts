import { createHmac } from 'node:crypto';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController patreon webhook', () => {
  const secret = 'webhook-secret';
  const body = { data: { type: 'member' }, included: [] };
  const rawBody = Buffer.from(JSON.stringify(body));
  const sign = (raw: Buffer, key = secret) => createHmac('md5', key).update(raw).digest('hex');
  let service: Record<'upsertMember' | 'markMemberDeleted' | 'createPledge' | 'updatePledge' | 'deletePledge', jest.Mock>;
  let controller: AppController;
  let error: jest.SpyInstance;
  const env = { ...process.env };

  const call = (headers: Record<string, string | undefined>, raw: Buffer = rawBody, payload: unknown = body) =>
    controller.updatePatreonSupporters({ rawBody: raw } as never, headers, payload);
  const signed = (event: string) => ({ 'x-patreon-event': event, 'x-patreon-signature': sign(rawBody) });
  const called = () => Object.entries(service).filter(([, fn]) => fn.mock.calls.length).map(([name]) => name);

  beforeEach(() => {
    service = { upsertMember: jest.fn(), markMemberDeleted: jest.fn(), createPledge: jest.fn(), updatePledge: jest.fn(), deletePledge: jest.fn() };
    controller = new AppController(service as unknown as AppService);
    process.env['PATREON_SUPPORTER_WEBHOOK_SECRET'] = secret;
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
});
