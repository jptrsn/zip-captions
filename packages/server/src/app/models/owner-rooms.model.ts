import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OwnerRoomDocument = HydratedDocument<OwnerRoom>;

@Schema()
export class OwnerRoom {
  @Prop({
    type: String,
    required: true
  })
  userId: string;

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  roomId: string;

  @Prop({
    type: Boolean,
    default: false
  })
  isStatic?: boolean;

  @Prop({
    type: Date,
    expires: 1000 * 60 * 60 // one hour
  })
  expiresAt: Date;
}

export const OwnerRoomSchema = SchemaFactory.createForClass(OwnerRoom);