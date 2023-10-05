import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { User } from './user.schema';
import { v4 } from 'uuid';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(username: string, hash: string): Promise<HydratedDocument<User>> {
    const newUser: HydratedDocument<User> = new this.userModel({
      username: username.toLowerCase(),
      hash,
      uuid: v4()
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

}
