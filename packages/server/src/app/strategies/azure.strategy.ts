import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from 'passport-microsoft';
import { PassportUserInfo } from "../modules/user/models/user.model";

@Injectable()
export class AzureStrategy extends PassportStrategy(Strategy, 'azure') {
  constructor() {
    super({
      clientID: process.env.AZURE_CLIENT_ID,
      clientSecret: process.env.AZURE_CLIENT_SECRET,
      callbackUrl: process.env.AZURE_REDIRECT_URI,
      tenant: 'common',
      scope: ['openid', 'email', 'profile', 'user.read']
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, provider, name, emails, photos } = profile;
    const user: PassportUserInfo = {
      id: id,
      provider: provider,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken,
      refreshToken
    };
    if (photos && photos[0]?.value) {
      user.picture = photos[0].value;
    }
    done(null, user);
  }
  
}