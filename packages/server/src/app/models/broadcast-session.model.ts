import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
  hostId: string;

  @Prop({
    type: String
  })
  ownerId?: string;

  @Prop({
    type: String
  })
  joinCode?: string;

  @Prop({
    type: Date
  })
  startTime?: Date;

  @Prop({
    type: Date
  })
  endTime?: Date;

  @Prop({
    type: Boolean
  })
  isStatic?: boolean;
}

export const BroadcastSessionSchema = SchemaFactory.createForClass(BroadcastSession);