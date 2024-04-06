import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 } from 'uuid';

export type SocketConnectionDocument = HydratedDocument<SocketConnection>;

@Schema()
export class SocketConnection {
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
    type: Date,
    expires: 1000 * 60 * 60 * 24, // one day
    required: true,
    default: Date.now
  })
  lastUpdated: Date;

}

export const SocketConnectionSchema = SchemaFactory.createForClass(SocketConnection);

SocketConnectionSchema.pre<SocketConnection>('save', function (next) {
  this.lastUpdated = new Date();
  return next();
})