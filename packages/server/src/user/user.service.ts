import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { User } from './user.schema';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(email: string, hash: string): Promise<HydratedDocument<User>> {
    const newUser = new this.userModel({
      email: email.toLowerCase(),
      hash
    });
    await newUser.save();
    return newUser;
  }

  async findById(id: string): Promise<HydratedDocument<User> | undefined> {
    return this.userModel.findById(id);
  }

  

}
