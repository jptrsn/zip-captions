import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from 'passport-azure-ad-oauth2'
import { PassportUserInfo } from "../modules/user/user.model";

@Injectable()
export class AzureStrategy extends PassportStrategy(Strategy, 'azure') {
  constructor() {
    super({
      clientID: process.env.AZURE_CLIENT_ID,
      clientSecret: process.env.AZURE_CLIENT_SECRET,
      callbackUrl: process.env.AZURE_REDIRECT_URI,
      useCommonEndpoint: true
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    params: any,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log('access token', accessToken)
    console.log('refresh token', refreshToken)
    console.log('params', params)
    console.log('profile', profile);
    // const { id, provider, name, emails, photos } = profile;
    // const user: PassportUserInfo = {
    //   id: id,
    //   provider: provider,
    //   email: emails[0].value,
    //   firstName: name.givenName,
    //   lastName: name.familyName,
    //   picture: photos[0].value,
    //   accessToken,
    //   refreshToken,
    // };
    done(null, profile);
  }
  
}