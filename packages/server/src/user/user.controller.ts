import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CacheService } from '../app/services/cache/cache.service';
import { GoogleApiService } from '../app/services/google-api/google-api.service';
import { UserService } from './user.service';
import { User } from './user.schema';
import { GoogleOauthCallbackFragment } from 'shared-ui';

@Controller('user')
export class UserController {
    constructor(private userService: UserService,
      private googleApi: GoogleApiService,
      private cache: CacheService) {

    }

    async getUser(username: string): Promise<User> {
      return this.cache.wrap(`${username}_user`, () => this.userService.findOne({primaryEmail: username}))
    }
  
    async getUserById(id: string, username?: string): Promise<User> {
      const userDoc = username ? await this.cache.wrap(`${username}_user`, () => this.userService.findById(id)) : await this.userService.findById(id);
      if (!username) {
        await this.cache.set(`${userDoc.primaryEmail}_user`, userDoc)
      }
      return userDoc;
    }
  
    getGoogleOauthRedirect(): string {
      return this.googleApi.getGoogleOauthRedirect()
    }

    @HttpCode(HttpStatus.OK)
    @Post('loginWithGoogle')
    async loginWithGoogle(@Body('creds') creds: GoogleOauthCallbackFragment): Promise<User> {
      this.googleApi.setToken(creds.access_token);
      const googleUserInfo = await this.cache.wrap(
        `google_userinfo_${creds.access_token}`,
        () => this.googleApi.getUser()
      )
      const user = await this.cache.wrap(
        `google_token_${googleUserInfo.sub}`,
        () => this.userService.addGoogleUser(googleUserInfo)
      )
      return user;
    }

}
