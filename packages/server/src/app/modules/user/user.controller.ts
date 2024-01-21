import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from '../../guards/google-oauth.guard';
import { UserService } from './user.service';
import { AzureOAuthGuard } from '../../guards/azure-oauth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('google-login')
    @UseGuards(GoogleOAuthGuard)
    async googleAuth(@Req() req) {
        console.log('login with google')
    }

    @Get('azure-login')
    @UseGuards(AzureOAuthGuard)
    async azureAuth(@Req() req) {
      console.log('login with azure')
    }

    @Get('google-redirect')
    @UseGuards(GoogleOAuthGuard)
    googleAuthRedirect(@Req() req) {
        return this.userService.googleLogin(req);
    }

    @Get('azure-redirect')
    @UseGuards(AzureOAuthGuard)
    azureAuthRedirect(@Req() req) {
      console.log('azure redirect', req.user);
    }
}
