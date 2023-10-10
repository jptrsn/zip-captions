import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth/auth.service';
import { DecodedToken, SignInTokenResponse } from 'shared-ui';


@Injectable()
export class GoogleTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async validate(creds: SignInTokenResponse): Promise<DecodedToken> {
    const token = await this.authService.decodeToken(creds);
    if (!token) {
      throw new UnauthorizedException();
    }
    return token;
  }
}