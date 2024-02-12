import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { CacheService } from '../../services/cache/cache.service';
import { PassportUserInfo, User } from './user.model';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>,
              private cache: CacheService) {}

  async createUser(email: string, opts?: Partial<User>): Promise<HydratedDocument<User>> {
    const model: Partial<User> = opts ? { ...opts, primaryEmail: email.toLowerCase() } : { primaryEmail: email.toLowerCase() };
    const newUser: HydratedDocument<User> = new this.userModel(model);
    await newUser.save();
    return newUser;
  }
   
  async findById(id: string): Promise<HydratedDocument<User> | undefined> {
    return this.userModel.findById(id);
  }

  async findOne(props: Partial<User>): Promise<HydratedDocument<User> | undefined> {
    return this.userModel.findOne(props);
  }

  // Finds or creates the user document and returns it for valid google oauth responses
  async googleLogin(req): Promise<HydratedDocument<User>> {
    if (!req.user) {
      throw new Error('No user from google');
    }
    const userInfo: PassportUserInfo = req.user;
    const cacheKey = `google_user_${userInfo.id}`
    let user = await this.cache.wrap(
      cacheKey,
      () => this.findOne({googleId: userInfo.id})
    )
    if (!user) {
      user = await this._loginUser(userInfo.email, {
        givenName: userInfo.firstName,
        familyName: userInfo.lastName,
        photoData: userInfo.picture,
        googleId: userInfo.id
      })
      await this.cache.set(cacheKey, user)
    }

    return user;
  }

  // Finds or creates the user document and returns it for valid google oauth responses
  async msLogin(req) {
    if (!req.user) {
      throw new Error('No user from microsoft');
    }
    const userInfo: PassportUserInfo = req.user;
    const cacheKey = `ms_user_${userInfo.id}`
    let user = await this.cache.wrap(
      cacheKey,
      () => this.findOne({msId: userInfo.id})
    )
    if (!user) {
      user = await this._loginUser(userInfo.email, {
        givenName: userInfo.firstName,
        familyName: userInfo.lastName,
        photoData: userInfo.picture,
        msId: userInfo.id
      })
      await this.cache.set(cacheKey, user)
    }

    return {
      message: 'User information from microsoft',
      user
    };
  }

  private async _loginUser(email: string, additionalUserInfo: Partial<User>): Promise<HydratedDocument<User>> {
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
