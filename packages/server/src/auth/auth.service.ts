import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CacheService } from '../app/services/cache/cache.service';
import { jwtConstants } from './constants';
import { DecodedToken, GoogleOauthCallbackFragment } from 'shared-ui';
import { URLSearchParams } from 'url';
import { v4 } from 'uuid';
import { GoogleApiService } from '../app/services/google-api/google-api.service';
import { User } from '../user/user.schema';
@Injectable()
export class AuthService {
  
  constructor(
    private userService: UserService,
    private googleApi: GoogleApiService,
    private cache: CacheService,
  ) {}

  async getUser(username: string): Promise<{uuid: string, username: string}> {
    const userDoc = await this.cache.wrap(`${username}_user`, () => this.userService.findOne({primaryEmail: username}))
    return {uuid: userDoc.uuid, username: userDoc.primaryEmail};
  }

  async getUserById(id: string, username?: string): Promise<{uuid: string, username: string}> {
    const userDoc = await this.cache.wrap(`${username}_user`, () => this.userService.findById(id))
    return {uuid: userDoc.uuid, username: userDoc.primaryEmail};
  }

  

  // Username & password combination logic
  /*
  async signIn(username: string, password: string): Promise<{uuid: string; username: string;}> {
    const user = await this.validateUser(username, password);
    return { uuid: user.uuid, username: user.username };
  }

  async validateUser(username: string, password: string): Promise<{uuid: string, username: string}> {
    const user = await this.cache.wrap(`${username}_user`, () => this.userService.findOne({primaryEmail: username}))
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const passwordValid = await bcrypt.compare(password, user.hash);
    if (passwordValid) {
      return {
        uuid: user.uuid,
        username: user.primaryEmail,
      }
    }
    return null;
  }

  async signUp(username: string, password: string): Promise<{ uuid: string, username: string }> {
    const existingUser = await this.userService.findOne({primaryEmail: username});
    if (existingUser) {
      throw new BadRequestException('Bad request');
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await this.userService.createUser(username, hashedPassword);
    return {uuid: newUser.uuid, username: newUser.primaryEmail }
  }
  */

  async connectGoogle(params: GoogleOauthCallbackFragment): Promise<User> {
    this.googleApi.setToken(params.access_token);
    const googleUserInfo = await this.cache.wrap(
      `google_userinfo_${params.access_token}`,
      () => this.googleApi.getUser()
    )
    const user = await this.cache.wrap(
      `google_token_${googleUserInfo.sub}`,
      () => this.userService.addGoogleUser(googleUserInfo)
    )
    return user;
  }

  getGoogleOauthRedirect(): string {
    return this.googleApi.getGoogleOauthRedirect()
  }

}
