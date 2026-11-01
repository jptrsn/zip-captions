import { BadRequestException } from '@nestjs/common';
import { createHmac } from 'crypto';
import { model } from 'mongoose';
import { AppService } from './app.service';
import { Supporter, SupporterSchema } from './models/supporter.model';
import { CreditAdd, CreditAddSchema } from './modules/user/models/credit-add.model';
import { User, UserSchema } from './modules/user/models/user.model';

type Payload = Parameters<AppService['upsertMember']>[0];

const patreonUser = { type: 'user', id: 'pu1', attributes: { email: 'patron@example.com', full_name: 'Pat Ron' } };
const tiers = { data: [{ id: 't1', type: 'tier' }] };

const member = (attributes: Record<string, unknown> = {}, relationships: Record<string, unknown> = { currently_entitled_tiers: tiers }, included: unknown[] = [patreonUser]): Payload =>
  ({ data: { type: 'member', attributes, relationships }, included }) as unknown as Payload;

describe('AppService', () => {
  const SupporterModel = model<Supporter>('AppServiceSpecSupporter', SupporterSchema);
  const UserModel = model<User>('AppServiceSpecUser', UserSchema);
  const CreditModel = model<CreditAdd>('AppServiceSpecCredit', CreditAddSchema);
  let service: AppService;
  let supporters: Supporter[];
  let users: User[];
  let creditSave: jest.SpyInstance;
  let userSave: jest.SpyInstance;
  let supporterSave: jest.SpyInstance;
  let credits: CreditAdd[];

  const env = { ...process.env };

  beforeEach(() => {
    supporters = [];
    users = [];
    credits = [];
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    supporterSave = jest.spyOn(SupporterModel.prototype, 'save').mockImplementation(function () { return Promise.resolve(this); });
    userSave = jest.spyOn(UserModel.prototype, 'save').mockImplementation(function () { return Promise.resolve(this); });
    creditSave = jest.spyOn(CreditModel.prototype, 'save').mockImplementation(function () { credits.push(this.toObject()); return Promise.resolve(this); });
    jest.spyOn(SupporterModel, 'findOne').mockImplementation((async (q: Record<string, unknown>) => {
      const hit = supporters.find((s) => Object.entries(q).every(([k, v]) => (s as unknown as Record<string, unknown>)[k] === v));
      return hit ? new SupporterModel(hit) : null;
    }) as never);
    jest.spyOn(UserModel, 'findOne').mockImplementation((async (q: Record<string, unknown>) => {
      const hit = users.find((u) => Object.entries(q).every(([k, v]) => (u as unknown as Record<string, unknown>)[k] === v));
      return hit ? new UserModel(hit) : null;
    }) as never);
    service = new AppService(SupporterModel as never, UserModel as never, CreditModel as never);
    process.env['PATREON_TOKEN_BALANCE_CAP'] = '180000';
    process.env['SESSION_SECRET'] = 'secret';
  });

  afterEach(() => {
    jest.restoreAllMocks();
    process.env = { ...env };
  });

  describe('upsertMember', () => {
    it('rejects a payload that is not a member', async () => {
      const payload = { data: { type: 'pledge' }, included: [] } as unknown as Payload;
      await expect(service.upsertMember(payload)).rejects.toThrow(BadRequestException);
    });

    it('records a paying member from the Patreon user, with the tiers as text', async () => {
      const supporter = await service.upsertMember(member({ is_follower: false, will_pay_amount_cents: 500, lifetime_support_cents: 1500, email: 'other@example.com', full_name: 'Other' }));
      expect(supporter).toMatchObject({ id: 'pu1', status: 'member', email: 'patron@example.com', displayName: 'Pat Ron', amountCents: 500, totalContribution: 1500 });
      expect(supporter.tiers).toBe(JSON.stringify(tiers.data));
    });

    it('records a free follower as a follower', async () => {
      const supporter = await service.upsertMember(member({ is_follower: true, will_pay_amount_cents: 0 }));
      expect(supporter.status).toBe('follower');
    });

    it('takes the name and email from the member when the user object has none', async () => {
      const bare = { type: 'user', id: 'pu1', attributes: {} };
      const supporter = await service.upsertMember(member({ email: 'm@example.com', full_name: 'Mem Ber' }, {}, [bare]));
      expect(supporter).toMatchObject({ email: 'm@example.com', displayName: 'Mem Ber' });
      expect(supporter.tiers).toBeUndefined();
    });

    it('rejects a member whose Patreon user is missing', async () => {
      await expect(service.upsertMember(member({ email: 'm@example.com', full_name: 'Mem Ber' }, {}, []))).rejects.toThrow(BadRequestException);
    });
  });

  describe('markMemberDeleted', () => {
    it('marks the supporter deleted and drops the tiers when the member has none', async () => {
      supporters.push({ id: 'pu1', email: 'patron@example.com', status: 'member', tiers: '[1]' });
      const supporter = await service.markMemberDeleted(member({ will_pay_amount_cents: 0 }, {}));
      expect(supporter.status).toBe('deleted');
      expect(supporter.deletedAt).toBeInstanceOf(Date);
      expect(supporter.tiers).toBeUndefined();
    });

    it('rejects a payload that is not a member', async () => {
      await expect(service.markMemberDeleted({ data: { type: 'x' }, included: [] } as unknown as Payload)).rejects.toThrow(BadRequestException);
    });
  });

  describe('createPledge', () => {
    it('records a pledge, which is not yet a payment', async () => {
      const supporter = await service.createPledge(member({ amount_cents: 700 }));
      expect(supporter).toMatchObject({ status: 'pledge', email: 'patron@example.com', amountCents: 700 });
    });

    it('needs the Patreon user\'s email', async () => {
      await expect(service.createPledge(member({}, {}, [{ type: 'user', id: 'x', attributes: {} }]))).rejects.toThrow('No user info found');
    });
  });

  describe('updatePledge', () => {
    const paid = (extra: Record<string, unknown> = {}) => member({
      last_charge_status: 'Paid', patron_status: 'active_patron', pledge_amount_cents: 500,
      campaign_pledge_amount_cents: 500, lifetime_support_cents: 1500, pledge_relationship_start: '2026-01-01T00:00:00Z', ...extra,
    });

    it('records the patron status after a successful charge, with the start date', async () => {
      const supporter = await service.updatePledge(paid());
      expect(supporter).toMatchObject({ status: 'active_patron', amountCents: 500 });
      expect(supporter.startDate).toEqual(new Date('2026-01-01T00:00:00Z'));
    });

    it('marks a supporter whose charge failed as lapsed', async () => {
      const supporter = await service.updatePledge(paid({ last_charge_status: 'Declined' }));
      expect(supporter.status).toBe('lapsed');
    });

    describe('monthly credit', () => {
      const memberPaid = () => paid({ patron_status: 'member' });

      it('tops a paying member\'s credit up to the cap and records the addition', async () => {
        users.push({ id: 'u1', primaryEmail: 'patron@example.com', creditBalance: 1000 });
        await service.updatePledge(memberPaid());
        expect(credits).toHaveLength(1);
        expect(credits[0]).toMatchObject({ userId: 'u1', provider: 'Monthly Patreon support', creditsAdded: 179000 });
        expect(userSave).toHaveBeenCalledTimes(1);
      });

      it('treats a user with no balance as having none', async () => {
        users.push({ id: 'u1', primaryEmail: 'patron@example.com' });
        await service.updatePledge(memberPaid());
        expect(credits[0].creditsAdded).toBe(180000);
      });

      it('adds nothing to a user who is at or above the cap', async () => {
        users.push({ id: 'u1', primaryEmail: 'patron@example.com', creditBalance: 180000 });
        await service.updatePledge(memberPaid());
        expect(creditSave).not.toHaveBeenCalled();
        expect(userSave).not.toHaveBeenCalled();
      });

      it('adds nothing when there is no account for the supporter\'s email', async () => {
        await service.updatePledge(memberPaid());
        expect(creditSave).not.toHaveBeenCalled();
      });

      it('adds nothing when no cap is configured', async () => {
        delete process.env['PATREON_TOKEN_BALANCE_CAP'];
        users.push({ id: 'u1', primaryEmail: 'patron@example.com', creditBalance: 0 });
        await service.updatePledge(memberPaid());
        expect(creditSave).not.toHaveBeenCalled();
      });

      it('adds nothing for a patron whose status is not "member", or whose charge did not succeed', async () => {
        users.push({ id: 'u1', primaryEmail: 'patron@example.com', creditBalance: 0 });
        await service.updatePledge(paid({ patron_status: 'active_patron' }));
        await service.updatePledge(paid({ patron_status: 'member', last_charge_status: 'Declined' }));
        expect(creditSave).not.toHaveBeenCalled();
      });

      it('adds nothing when the pledge or lifetime amount is zero', async () => {
        users.push({ id: 'u1', primaryEmail: 'patron@example.com', creditBalance: 0 });
        await service.updatePledge(paid({ patron_status: 'member', campaign_pledge_amount_cents: 0 }));
        expect(creditSave).not.toHaveBeenCalled();
      });
    });
  });

  describe('deletePledge', () => {
    it('marks the supporter lapsed with the date of the last charge', async () => {
      await service.deletePledge(member({ pledge_amount_cents: 500, lifetime_support_cents: 1500, last_charge_date: '2026-02-01T00:00:00Z' }));
      expect(supporterSave).toHaveBeenCalledTimes(1);
      const saved = (supporterSave.mock.contexts[0] as { status: string; endDate: Date });
      expect(saved.status).toBe('lapsed');
      expect(saved.endDate).toEqual(new Date('2026-02-01T00:00:00Z'));
    });

    it('needs the Patreon user\'s email', async () => {
      await expect(service.deletePledge(member({}, {}, []))).rejects.toThrow(BadRequestException);
    });
  });

  describe('upsertSupporter', () => {
    it('creates a supporter that does not exist yet', async () => {
      const s = await service.upsertSupporter({ id: 'pu1', email: 'a@b.c', status: 'member' });
      expect(s.email).toBe('a@b.c');
      expect(supporterSave).toHaveBeenCalledTimes(1);
    });

    it('updates the supporter with the same email, and a null removes a field', async () => {
      supporters.push({ id: 'pu1', email: 'a@b.c', status: 'member', tiers: '[1]', amountCents: 100 });
      const s = await service.upsertSupporter({ email: 'a@b.c', status: 'lapsed', tiers: null as never });
      expect(s.status).toBe('lapsed');
      expect(s.amountCents).toBe(100);
      expect(s.tiers).toBeUndefined();
    });
  });

  describe('encodeDbKey', () => {
    it('is the SHA-256 HMAC of the input under the session secret', () => {
      expect(service.encodeDbKey('user-1')).toBe(createHmac('sha256', 'secret').update('user-1').digest('hex'));
    });

    it('differs per input and per secret', () => {
      const first = service.encodeDbKey('a');
      expect(service.encodeDbKey('b')).not.toBe(first);
      process.env['SESSION_SECRET'] = 'another';
      expect(service.encodeDbKey('a')).not.toBe(first);
    });
  });
});
