import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'bson';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop({
    type: UUID,
    required: true
  })
  uuid: string;

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  primaryEmail: string;

  @Prop({
    type: Date,
    required: true,
    default: new Date()
  })
  createdAt: Date;

  @Prop({
    type: String
  })
  hash?: string;

  @Prop({
    type: String
  })
  googleId?: string;

  @Prop({
    type: String
  })
  pictureUrl?: string;

}

export const UserSchema = SchemaFactory.createForClass(User);