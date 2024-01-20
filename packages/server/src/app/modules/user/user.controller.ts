import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from '../../guards/google-oauth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('google-login')
    @UseGuards(GoogleOAuthGuard)
    async googleAuth(@Req() req) {
        console.log('login')
    }

    @Get('google-redirect')
    @UseGuards(GoogleOAuthGuard)
    googleAuthRedirect(@Req() req) {
        return this.userService.googleLogin(req);
    }
}
