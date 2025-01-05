import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CacheService } from '../../../services/cache/cache.service';
import { PassportUserInfo, User, UserDocument } from '../models/user.model';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {

  }

  async createUser(email: string, opts?: Partial<User>): Promise<UserDocument> {
    const model: Partial<User> = { primaryEmail: email.toLowerCase() };
    for (const [key, value] of Object.entries(opts)) {
      if (value) {
        model[key] = value;
      }
    }
    const newUser: UserDocument = new this.userModel(model);
    await newUser.save();
    return newUser;
  }

  async findOne(props: Partial<User>): Promise<UserDocument | undefined> {
    return this.userModel.findOne(props);
  }

  async updateUser(id: string, update: Partial<User>): Promise<UserDocument> {
    const user = await this.findOne({id});
    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    for (const [key, value] of Object.entries(update)) {
      user[key] = value;
    }
    await user.save();
    return user;

  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userModel.findOne({id});
    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    await this.userModel.deleteOne({id});
  }

  // Finds or creates the user document and returns it for valid google oauth responses
  async googleLogin(req): Promise<UserDocument> {
    if (!req.user) {
      throw new Error('No user from google');
    }
    const userInfo: PassportUserInfo = req.user;
    let user = await this.findOne({googleId: userInfo.id})
    if (!user) {
      user = await this._loginUser(userInfo.email, {
        googleId: userInfo.id
      })
    }

    return user;
  }

  // Finds or creates the user document and returns it for valid msft oauth responses
  async msLogin(userInfo: PassportUserInfo): Promise<UserDocument> {
    let user = await this.findOne({msId: userInfo.id});
    if (!user) {
      user = await this._loginUser(userInfo.email, {
        msId: userInfo.id
      })
    }
    return user;
  }

	// Finds or creates the user document and returns it for valid apple oauth responses
  async appleLogin(userInfo: PassportUserInfo): Promise<UserDocument> {
    let user = await this.findOne({appleId: userInfo.id});
    if (!user) {
      user = await this._loginUser(userInfo.email, {
        appleId: userInfo.id
      })
    }
    return user;
  }

  async patreonLogin(userInfo: PassportUserInfo): Promise<UserDocument> {
    console.log('patreonLogin', userInfo);
    let user = await this.findOne({patreonId: userInfo.id});
    if (!user) {
      user = await this._loginUser(userInfo.email, {
        patreonId: userInfo.id,
        patreonRefreshToken: userInfo.refreshToken
      })
    } else {
      user.patreonRefreshToken = userInfo.refreshToken;
      await user.save();
    }
    return user;
  }

  private async _loginUser(email: string, additionalUserInfo: Partial<User>): Promise<UserDocument> {
    const fromDb = await this.findOne({primaryEmail: email})
    if (fromDb) {
      for (const [key, value] of Object.entries(additionalUserInfo)) {
        if (value) {
          fromDb[key] = value;
        }
      }
      await fromDb.save();
      return fromDb;
    } else {
      return this.createUser(email, additionalUserInfo);
    }
  }

}
