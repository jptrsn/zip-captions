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
    expires: 1,
  })
  expires: Date;
}

export const OwnerRoomSchema = SchemaFactory.createForClass(OwnerRoom);

OwnerRoomSchema.pre<OwnerRoom>('validate', function (next) {
  if (!this.isStatic && !this.expires) {
    const expires = new Date();
    expires.setDate(new Date().getDate() + 1);
    this.expires = expires;
    return next();
  }
})