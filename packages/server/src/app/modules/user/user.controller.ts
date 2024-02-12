import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from '../../guards/google-oauth.guard';
import { UserService } from './user.service';
import { AzureOAuthGuard } from '../../guards/azure-oauth.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
                private jwtService: JwtService) 
    {

    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getUser(@Req() req, @Res() res) {
      console.log('get User', req.user)
      const user = await this.userService.findOne({id: req.user.id});
      res.status(HttpStatus.OK).send(user.toJSON());
    }

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
        const token = this.jwtService.sign({sub: user.id })
        res.redirect(`http://localhost:4200/auth/login?id_token=${token}`)
    }

    @Get('azure-redirect')
    @UseGuards(AzureOAuthGuard)
    async azureAuthRedirect(@Req() req, @Res() res) {
      console.log('azure redirect', req);
      try {
        if (req.authInfo.message) {
          throw new Error('No user from microsoft');
        }
        const response = await this.userService.msLogin(req.user);
        res.json(response) 
      } catch(e: any) {
        res.redirect(`http://localhost:4200/auth/login?error=${encodeURIComponent(e)}`)
      }
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
