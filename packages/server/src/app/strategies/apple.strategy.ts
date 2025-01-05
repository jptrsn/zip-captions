import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from '@arendajaelu/nestjs-passport-apple';
import { Injectable } from '@nestjs/common';
import { PassportUserInfo } from '../modules/user/models/user.model';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor() {
    super({
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
			keyID: process.env.APPLE_KEY_ID,
			key: process.env.APPLE_KEY_STRING,
			callbackURL: process.env.APPLE_REDIRECT_URI,
			scope: ['email', 'name'],
			passReqToCallback: false,
    });
  }
  async validate(
		accessToken: string,
    refreshToken: string,
    profile: Profile
  ): Promise<any> {
		console.log('apple strategy validate')
		console.log('profile', profile);
    const { id, provider, name, email } = profile;
    const user: PassportUserInfo = {
      id: id,
      provider: provider,
      email: email,
      firstName: name.firstName,
      lastName: name.lastName,
      accessToken,
      refreshToken,
    };
		return user;
  }
}