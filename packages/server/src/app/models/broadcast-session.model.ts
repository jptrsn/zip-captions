import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 } from 'uuid';

export type BroadcastSessionDocument = HydratedDocument<BroadcastSession>;

@Schema()
export class BroadcastSession {
  @Prop({
    type: String,
    required: true,
    unique: true
  })
  roomId: string;

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  hostClientId: string;

  @Prop({
    type: String,
    required: true
  })
  hostUserId: string;

  @Prop({
    type: Date,
    expires: 1000 * 60 * 60 * 24 // 1 day
  })
  startTime?: Date;

  @Prop({
    type: Date,
    expires: 1000 * 60 * 60 // one hour
  })
  endTime?: Date;

}

export const BroadcastSessionSchema = SchemaFactory.createForClass(BroadcastSession)