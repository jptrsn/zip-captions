import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
    unique: true
  })
  email: string;

  @Prop({
    type: String,
    required: true
  })
  hash: string;

  timestamps: true;
}

export const UserSchema = SchemaFactory.createForClass(User);