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
    required: true,
    default: Date.now
  })
  createdAt: Date;

  @Prop({
    type: Date,
    expires: 1000 * 60 * 60 * 24, // one day
  })
  hasExpiry: Date;
}

export const OwnerRoomSchema = SchemaFactory.createForClass(OwnerRoom);

OwnerRoomSchema.pre<OwnerRoom>('validate', function (next) {
  if (!this.isStatic && !this.hasExpiry) {
    this.hasExpiry = new Date();
    return next();
  }
})