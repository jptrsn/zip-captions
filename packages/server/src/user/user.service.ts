import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { User } from './user.schema';
import { v4 } from 'uuid';
import { DecodedToken } from 'shared-ui';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(username: string, hash: string): Promise<HydratedDocument<User>> {
    const uuid = v4();
    const newUser: HydratedDocument<User> = new this.userModel({
      username: username.toLowerCase(),
      hash,
      uuid
    });
    await newUser.save();
    return newUser;
  }

  async findById(id: string): Promise<HydratedDocument<User> | undefined> {
    return this.userModel.findById(id);
  }

  async findOne(props: Partial<User>): Promise<HydratedDocument<User> | undefined> {
    return this.userModel.findOne(props);
  }

  async addGoogleUser(token: DecodedToken): Promise<HydratedDocument<User>> {
    let user = await this.findOne({ username: token.email });
    if (!user) {
      user = await this.userModel.create({
        username: token.email,
        uuid: v4(),
        googleId: token.sub
      });
    } else if (user.googleId === token.sub) {
      return user;
    } else {
      user.googleId = token.sub;  
    }
    await user.save();
    return user;
  }

}
