import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BroadcastSessionDocument = HydratedDocument<BroadcastSession>;

@Schema()
export class BroadcastSession {
  @Prop({
    type: String,
    required: true,
    index: true
  })
  roomId: string;

  @Prop({
    type: String,
    required: true,
    index: true
  })
  hostClientId: string;

  @Prop({
    type: String,
    required: true,
  })
  hostUserId: string;

  @Prop({
    type: Date,
    expires: 1000 * 60 * 60 * 24 // 1 day
  })
  startTime?: Date;

  @Prop({
    type: Date,
    index: true
  })
  endTime?: Date;

  @Prop({
    type: Boolean
  })
  allowAnonymous?: boolean;

}

export const BroadcastSessionSchema = SchemaFactory.createForClass(BroadcastSession)