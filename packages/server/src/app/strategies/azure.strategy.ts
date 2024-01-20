import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { BearerStrategy } from 'passport-azure-ad'
import { PassportUserInfo } from "../modules/user/user.model";

@Injectable()
export class AzureStrategy extends PassportStrategy(BearerStrategy, 'azure') {
  constructor() {
    super({
      identityMetadata: 'https://login.microsoftonline.com/common/.well-known/openid-configuration',
      clientId: process.env.AZURE_CLIENT_ID,
      responseType: 'code id_token',
      responseMode: 'form_post',
      redirectUrl: process.env.AZURE_REDIRECT_URI,
      allowHttpForRedirectUrl: true,
      clientSecret: process.env.AZURE_CLIENT_SECRET,
      scope: ['email', 'profile']
    })
  }

  async validate(
    profile: any,
    accessToken: string,
    refreshToken: string,
    done,
  ): Promise<any> {
    console.log('profile', profile);
    const { id, provider, name, emails, photos } = profile;
    const user: PassportUserInfo = {
      id: id,
      provider: provider,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
  
}