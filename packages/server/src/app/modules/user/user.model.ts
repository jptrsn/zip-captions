import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { uuid } from 'uuidv4';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop({
      type: String,
      required: true,
      default: () => uuid()
  })
  id: string;

  @Prop({
    type: String,
    required: true,
    trim: true
  })
  primaryEmail: string;

  @Prop({
    type: String,
    trim: true
  })
  familyName?: string;

  @Prop({
    type: String,
    trim: true
  })
  givenName?: string;

  @Prop({
    type: String
  })
  photoData?: string;

  @Prop({
    type: Date,
    required: true,
    default: Date.now
  })
  createdAt?: Date;

  @Prop({
    type: String
  })
  googleId?: string;

}

export const UserSchema = SchemaFactory.createForClass(User);

export interface PassportUserInfo {
  id: string;
  provider: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
  refreshToken?: string;
}