import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common"
import { AuthService } from "../auth/auth.service";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleTokenGuard extends AuthGuard('google-token') implements CanActivate {

  constructor(@Inject(AuthService) private authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    console.log('calling login function')
    const token = await this.authService.decodeToken(request.body.creds);
    if (!token) {
       return false;
    }
    request.user = { username: token.email, uuid: token.sub };
    await super.logIn(request);
    return true;
  }
}