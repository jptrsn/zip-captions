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
  username: string;

  @Prop({
    type: String
  })
  hash: string;

  @Prop({
    type: String
  })
  googleId: string;

}

export const UserSchema = SchemaFactory.createForClass(User);