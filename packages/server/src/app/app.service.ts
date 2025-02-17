import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Supporter, SupporterDocument } from './models/supporter.model';
import { Model } from 'mongoose';
import { PatreonMembersCreateWebhookPayload, PatreonPledgeCreateWebhookPayload, PatreonPledgeUpdateWebhookPayload, PatreonUserObject, PatreonWebhookPayload } from './models/patreon.model';
import { createHmac } from 'crypto';
import { User } from './modules/user/models/user.model';
import { CreditAdd } from './modules/user/models/credit-add.model';

@Injectable()
export class AppService {
  constructor(@InjectModel(Supporter.name) private supporterModel: Model<Supporter>,
              @InjectModel(User.name) private userModel: Model<User>,
              @InjectModel(CreditAdd.name) private creditAdd: Model<CreditAdd>) {}

  async upsertMember(payload: PatreonWebhookPayload): Promise<SupporterDocument> {
    if (payload.data.type !== 'member') {
      throw new BadRequestException('Invalid payload type');
    }
    const userObject = payload.included.find((inc) => inc.type === 'user') as PatreonUserObject | undefined;
    if (!userObject) {
      console.log('no user info in body', JSON.stringify(payload.included));
    }

    const data = payload.data as PatreonMembersCreateWebhookPayload;
    const email = userObject?.attributes?.email || data.attributes.email;
    const id = userObject?.id;
    const displayName = userObject?.attributes?.full_name || data.attributes.full_name;

    if (!email || !id || !displayName) {
      console.log('field missing for update', email, id, displayName);
      throw new BadRequestException();
    }

    const record: Supporter = {
      id,
      status: data.attributes.is_follower ? 'follower' : 'member',
      email,
      displayName,
      amountCents: data.attributes.will_pay_amount_cents,
      totalContribution: data.attributes.lifetime_support_cents
    }
    if (data.relationships.currently_entitled_tiers) {
      record.tiers = JSON.stringify(data.relationships.currently_entitled_tiers.data);
    }
    return this.upsertSupporter(record);
  }

  async markMemberDeleted(payload: PatreonWebhookPayload): Promise<SupporterDocument> {
    if (payload.data.type !== 'member') {
      throw new BadRequestException('Invalid payload type');
    }
    const userObject = payload.included.find((inc) => inc.type === 'user') as PatreonUserObject | undefined;
    if (!userObject) {
      console.log('no user info in body', JSON.stringify(payload.included));
    }

    const data = payload.data as PatreonMembersCreateWebhookPayload;
    const email = userObject?.attributes.email || data.attributes.email;
    const id = userObject?.id;
    const displayName = userObject?.attributes.full_name || data.attributes.full_name;

    if (!email || !id || !displayName) {
      console.log('field missing for update', email, id, displayName);
      throw new BadRequestException();
    }

    const record: Supporter = {
      id,
      status: 'deleted',
      email,
      displayName,
      amountCents: data.attributes.will_pay_amount_cents,
      totalContribution: data.attributes.lifetime_support_cents,
      deletedAt: new Date()
    }
    if (data.relationships.currently_entitled_tiers) {
      record.tiers = JSON.stringify(data.relationships.currently_entitled_tiers.data);
    } else {
      record.tiers = null;
    }
    return this.upsertSupporter(record);
  }

  async createPledge(payload: PatreonWebhookPayload): Promise<SupporterDocument> {
    if (payload.data.type !== 'member') {
      throw new BadRequestException('Invalid payload type');
    }
    const userObject = payload.included.find((inc) => inc.type === 'user') as PatreonUserObject | undefined;
    if (!userObject?.attributes.email) {
      console.log('no user info in body', payload, userObject)
      throw new BadRequestException('No user info found');
    }

    const data = payload.data as PatreonPledgeCreateWebhookPayload;
    const record: Supporter = {
      id: userObject.id,
      status: 'pledge',
      email: userObject.attributes.email,
      displayName: userObject.attributes.full_name,
      amountCents: data.attributes.amount_cents
    }
    if (data.relationships.currently_entitled_tiers) {
      record.tiers = JSON.stringify(data.relationships.currently_entitled_tiers.data);
    }
    return this.upsertSupporter(record);
  }

  async updatePledge(payload: PatreonWebhookPayload): Promise<SupporterDocument> {
    if (payload.data.type !== 'member') {
      throw new BadRequestException('Invalid payload type');
    }
    const userObject = payload.included.find((inc) => inc.type === 'user') as PatreonUserObject | undefined;
    if (!userObject?.attributes.email) {
      console.log('no user info in body', payload, userObject)
      throw new BadRequestException('No user info found');
    }

    const data = payload.data as PatreonPledgeUpdateWebhookPayload;

    const record: Partial<Supporter> = {
      id: userObject.id,
      status: data.attributes.last_charge_status === 'Paid' ? data.attributes.patron_status : 'lapsed',
      email: userObject.attributes.email,
      displayName: userObject.attributes.full_name,
      amountCents: data.attributes.pledge_amount_cents,
    }
    if (data.attributes.pledge_relationship_start) {
      record.startDate = new Date(data.attributes.pledge_relationship_start)
    }
    if (data.relationships.currently_entitled_tiers) {
      record.tiers = JSON.stringify(data.relationships.currently_entitled_tiers.data);
    }
    const s = await this.upsertSupporter(record);
    if (data.attributes.last_charge_status === 'Paid' && data.attributes.patron_status === 'member') {
      await this.updateUserBalance(s, data.attributes.campaign_pledge_amount_cents, data.attributes.lifetime_support_cents)
    }
    return s;
  }

  async deletePledge(payload: PatreonWebhookPayload): Promise<any> {
    if (payload.data.type !== 'member') {
      throw new BadRequestException('Invalid payload type');
    }
    const userObject = payload.included.find((inc) => inc.type === 'user') as PatreonUserObject | undefined;
    if (!userObject?.attributes.email) {
      console.log('no user info in body', payload, userObject)
      throw new BadRequestException('No user info found');
    }

    const data = payload.data as PatreonPledgeUpdateWebhookPayload;
    const record: Partial<Supporter> = {
      id: userObject.id,
      status: 'lapsed',
      email: userObject.attributes.email,
      displayName: userObject.attributes.full_name,
      amountCents: data.attributes.pledge_amount_cents,
      totalContribution: data.attributes.lifetime_support_cents,
      endDate: new Date(data.attributes.last_charge_date)
    };
    if (data.relationships.currently_entitled_tiers) {
      record.tiers = JSON.stringify(data.relationships.currently_entitled_tiers.data);
    }

    await this.upsertSupporter(record);
  }

  async upsertSupporter(record: Partial<Supporter>): Promise<SupporterDocument> {
    let supporter = await this.findSupporter({ email: record.email });
    if (!supporter) {
      supporter = new this.supporterModel(record);
    } else {
      for (const k of Object.keys(record)) {
        if (record[k] === null) {
          delete supporter[k]
        } else {
          supporter[k] = record[k];
        }
      }
    }
    await supporter.save();
    return supporter;
  }

  async findSupporter(props: Partial<Supporter>): Promise<SupporterDocument | undefined> {
    return this.supporterModel.findOne(props);
  }

  encodeDbKey(input: string): string {
    const hmac = createHmac('sha256', process.env.SESSION_SECRET);
    hmac.update(input);
    return hmac.digest('hex');
  }

  private async updateUserBalance(supporter: SupporterDocument, pledgeAmount: number, totalContribution: number): Promise<any> {
    const capStr = process.env.PATREON_TOKEN_BALANCE_CAP
    if (pledgeAmount && totalContribution && capStr) {
      const cap = parseInt(capStr);
      const user = await this.userModel.findOne({ primaryEmail: supporter.email });
      if (user) {
        const curr = user?.creditBalance ?? 0;
        const addAmount = cap - curr;
        if (addAmount > 0) {
          const balanceAdd = new this.creditAdd({
            userId: user.id,
            provider: "Monthly Patreon support",
            creditsAdded: addAmount
          });
          await balanceAdd.save();
          user.creditBalance = curr + addAmount;
          await user.save();
        }
      }
    }
  }
}
