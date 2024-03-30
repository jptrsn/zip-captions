import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 } from 'uuid';

export type BroadcastSessionDocument = HydratedDocument<BroadcastSession>;

@Schema()
export class BroadcastSession {
  // The user ID, either matches the id property in the User collection, or is randomized
  @Prop({
    type: String,
    required: true,
    unique: true,
    default: () => v4()
  })
  userId: string;

  @Prop({
    type: Array<string>,
  })
  clientIds?: string[];

  @Prop({
    type: String,
    unique: true
  })
  roomId?: string;

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