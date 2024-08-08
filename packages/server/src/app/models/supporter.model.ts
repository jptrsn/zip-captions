import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SupporterDocument = HydratedDocument<Supporter>;

@Schema()
export class Supporter {
  @Prop({
    type: String,
    required: true
  })
  id: string; // Patreon user ID

  @Prop({
    type: String,
    required: true
  })
  email: string; // Patreon linked email address

  // Indicates current support status
  // member is a user who joined the campaign but is not a financial contributor
  // follower is a user who has joined the campain, follows us on patreon but is not a financial supporter
  // pledge is a user who has signed up to contribute but not yet had a payment processed
  // active_patron is an active supporter
  // former_patron is a supporter who no longer contributes
  // lapsed is a user who has had a payment fail to process
  // deleted is a user who left the campaign
  @Prop({
    type: String,
    required: true
  })
  status: 'member' | 'follower' | 'pledge' | 'active_patron' | 'former_patron' | 'lapsed' | 'deleted' | string;

  @Prop({
    type: String
  })
  displayName?: string; // Name from patreon API

  @Prop({
    type: String
  })
  tiers?: string; // Unknown data format, it's an array of _something_

  @Prop({
    type: Number
  })
  amountCents?: number; // Monthly contribution amount

  @Prop({
    type: Number
  })
  totalContribution?: number; // Lifetime contributions

  @Prop({
    type: Date
  })
  startDate?: Date; // Date they joined the campaign

  @Prop({
    type: Date
  })
  endDate?: Date; // Date they left the campaign

  @Prop({
    type: Date,
    required: true,
    default: Date.now
  })
  createdAt?: Date;
  
  @Prop({
    type: Date
  })
  updatedAt?: Date;

  @Prop({
    type: Date,
    expires: 1000 * 60 * 60 * 24 * 365 // 365 days
  })
  deletedAt?: Date;
}

export const SupporterSchema = SchemaFactory.createForClass(Supporter);

SupporterSchema.pre<Supporter>('validate', function (next) {
  if (!this.deletedAt) {
    this.updatedAt = new Date();
  }
  return next();
})