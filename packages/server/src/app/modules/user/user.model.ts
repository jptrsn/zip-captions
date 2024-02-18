import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 } from 'uuid';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop({
      type: String,
      required: true,
      default: () => v4()
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

  @Prop({
    type: String
  })
  msId?: string;

}

export const UserSchema = SchemaFactory.createForClass(User);

export interface PassportUserInfo {
  id: string;
  provider: string;
  email: string;
  firstName: string;
  lastName: string;
  picture?: string;
  accessToken: string;
  refreshToken?: string;
}

export interface UserProfile {
  id: string;
  primaryEmail: string;
  createdAt: string;
  familyName?: string;
  givenName?: string;
  organizationName?: string;
  googleConnected?: boolean;
  azureConnected?: boolean;
}