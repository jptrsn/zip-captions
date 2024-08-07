import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SupporterDocument = HydratedDocument<Supporter>;

@Schema()
export class Supporter {
  @Prop({
    type: String,
    required: true
  })
  id: string;

  @Prop({
    type: String,
    required: true
  })
  email: string;

  @Prop({
    type: String,
    required: true
  })
  status: string;

  @Prop({
    type: Number
  })
  amountCents?: number;

  @Prop({
    type: Number
  })
  totalContribution?: number;

  @Prop({
    type: Date,
    required: true,
    default: Date.now
  })
  createdAt?: Date;

  @Prop({
    type: Date
  })
  startDate?: Date;

  @Prop({
    type: Date
  })
  endDate?: Date;
}

export const SupporterSchema = SchemaFactory.createForClass(Supporter);