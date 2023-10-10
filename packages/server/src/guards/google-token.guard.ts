import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common"
import { AuthService } from "../auth/auth.service";

@Injectable()
export class GoogleTokenGuard implements CanActivate {

  constructor(@Inject(AuthService) private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const decoded = await this.authService.decodeToken(request.body.creds);
    return !!decoded;
  }
}