import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-patreon";
import { UserService } from "../modules/user/services/user.service";

@Injectable()
export class PatreonStrategy extends PassportStrategy(Strategy) {
  static key = "patreon"
  constructor(private userService: UserService) {
    super({
      clientID: process.env.PATREON_CLIENT_ID,
      clientSecret: process.env.PATREON_CLIENT_SECRET,
      callbackUrl: process.env.PATREON_REDIRECT_URI,
      scope: 'identity[email]'
    }, function(accessToken, refreshToken, profile, done) {
      // TODO: Implement patreon user creation correctly
      this.userService.patreonLogin(profile).then((user) => {
        return done(null, user)
      }).catch((e) => done(e, null))
    })
  }
}