import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from '../../guards/google-oauth.guard';
import { UserService } from './user.service';
import { AzureOAuthGuard } from '../../guards/azure-oauth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
                private jwtService: JwtService) 
    {

    }

    @Get('login')
    @UseGuards()

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
    async googleAuthRedirect(@Req() req, @Res() res) {
        const user = await this.userService.googleLogin(req);
        const token = this.jwtService.sign({sub: user.id, user})
        res.cookie('id', token, { sameSite: true });
        res.redirect(`http://localhost:4200/auth/login?getUser`)
    }

    @Get('azure-redirect')
    @UseGuards(AzureOAuthGuard)
    async azureAuthRedirect(@Req() req, @Res() res) {
      const response = await this.userService.msLogin(req);
      res.json(response)
    }

    @Get('logout')
    azureAuthLogout(@Req() req, @Res() res) {
      req.session.destroy(() => {
        req.logout(() => {
          res.send('OK')
        })
      })
    }
}
