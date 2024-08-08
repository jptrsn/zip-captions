import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Supporter, SupporterDocument } from './models/supporter.model';
import { Model } from 'mongoose';
import { PatreonMembersCreateWebhookPayload, PatreonPledgeCreateWebhookPayload, PatreonPledgeUpdateWebhookPayload, PatreonUserObject, PatreonWebhookPayload } from './models/patreon.model';

@Injectable()
export class AppService {
  constructor(@InjectModel(Supporter.name) private supporterModel: Model<Supporter>) {}

  async upsertMember(payload: PatreonWebhookPayload): Promise<SupporterDocument> {
    if (payload.data.type !== 'member') {
      throw new BadRequestException('Invalid payload type');
    }
    const userObject = payload.included.find((inc) => inc.type === 'user') as PatreonUserObject | undefined;
    if (!userObject?.attributes.email) {
      throw new BadRequestException('No user info found');
    }

    const data = payload.data as PatreonMembersCreateWebhookPayload;
    const record: Supporter = {
      id: userObject.id,
      status: data.attributes.is_follower ? 'follower' : 'member',
      email: userObject.attributes.email,
      amountCents: data.attributes.will_pay_amount_cents,
      totalContribution: data.attributes.lifetime_support_cents
    }
    if (data.relationships.currently_entitled_tiers) {
      record.tiers = JSON.stringify(data.relationships.currently_entitled_tiers);
    }
    return this.upsertSupporter(record);
  }

  async markMemberDeleted(payload: PatreonWebhookPayload): Promise<SupporterDocument> {
    if (payload.data.type !== 'member') {
      throw new BadRequestException('Invalid payload type');
    }
    const userObject = payload.included.find((inc) => inc.type === 'user') as PatreonUserObject | undefined;
    if (!userObject?.attributes.email) {
      console.log('no email', JSON.stringify(payload));
      throw new BadRequestException('No user info found');
    }

    const data = payload.data as PatreonMembersCreateWebhookPayload;
    const record: Supporter = {
      id: userObject.id,
      status: 'deleted',
      email: userObject.attributes.email,
      amountCents: data.attributes.will_pay_amount_cents,
      totalContribution: data.attributes.lifetime_support_cents,
      tiers: JSON.stringify(data.relationships.currently_entitled_tiers),
      deletedAt: new Date()
    }
    if (data.relationships.currently_entitled_tiers) {
      record.tiers = JSON.stringify(data.relationships.currently_entitled_tiers);
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
      throw new BadRequestException('No user info found');
    }

    const data = payload.data as PatreonPledgeCreateWebhookPayload;
    const record: Supporter = {
      id: userObject.id,
      status: 'pledge',
      email: userObject.attributes.email,
      amountCents: data.attributes.amount_cents
    }
    if (data.relationships.currently_entitled_tiers) {
      record.tiers = JSON.stringify(data.relationships.currently_entitled_tiers);
    }
    return this.upsertSupporter(record);
  }

  async updatePledge(payload: PatreonWebhookPayload): Promise<any> {
    if (payload.data.type !== 'member') {
      throw new BadRequestException('Invalid payload type');
    }
    const userObject = payload.included.find((inc) => inc.type === 'user') as PatreonUserObject | undefined;
    if (!userObject?.attributes.email) {
      throw new BadRequestException('No user info found');
    }

    const data = payload.data as PatreonPledgeUpdateWebhookPayload;
    
    const record: Partial<Supporter> = {
      id: userObject.id,
      status: data.attributes.last_charge_status === 'Paid' ? data.attributes.patron_status : 'lapsed',
      email: userObject.attributes.email,
      amountCents: data.attributes.pledge_amount_cents,
    }
    if (data.attributes.pledge_relationship_start) {
      record.startDate = new Date(data.attributes.pledge_relationship_start)
    }
    if (data.relationships.currently_entitled_tiers) {
      record.tiers = JSON.stringify(data.relationships.currently_entitled_tiers);
    }
    await this.upsertSupporter(record);
    
  }

  async deletePledge(payload: PatreonWebhookPayload): Promise<any> {
    if (payload.data.type !== 'member') {
      throw new BadRequestException('Invalid payload type');
    }
    const userObject = payload.included.find((inc) => inc.type === 'user') as PatreonUserObject | undefined;
    if (!userObject?.attributes.email) {
      throw new BadRequestException('No user info found');
    }

    const data = payload.data as PatreonPledgeUpdateWebhookPayload;
    const record: Partial<Supporter> = {
      id: userObject.id,
      status: 'lapsed',
      email: userObject.attributes.email,
      amountCents: data.attributes.pledge_amount_cents,
      totalContribution: data.attributes.lifetime_support_cents,
      endDate: new Date(data.attributes.last_charge_date)
    };
    if (data.relationships.currently_entitled_tiers) {
      record.tiers = JSON.stringify(data.relationships.currently_entitled_tiers);
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
}
