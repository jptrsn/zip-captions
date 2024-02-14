import { Controller, Get, HttpStatus, Next, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from '../../guards/google-oauth.guard';
import { UserService } from './user.service';
import { AzureOAuthGuard } from '../../guards/azure-oauth.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Response } from 'express';

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
      try {
        const user = await this.userService.googleLogin(req);
        this._sendTokenResponse(user.id, res);
      } catch(e) {
        res.redirect(`http://localhost:4200/auth/login?error=${encodeURIComponent(e)}`)
      }
    }

    @Get('azure-redirect')
    @UseGuards(AzureOAuthGuard)
    async azureAuthRedirect(@Req() req, @Res() res) {
      try {
        if (req.authInfo.message) {
          throw new Error('No user from microsoft');
        }
        const user = await this.userService.msLogin(req.user);
        this._sendTokenResponse(user.id, res);
      } catch(e: any) {
        res.redirect(`http://localhost:4200/auth/login?error=${encodeURIComponent(e)}`)
      }
    }

    @Get('logout')
    @UseGuards(JwtAuthGuard)
    logout(@Req() req, @Res() res, @Next() next) {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/')
      })
    }

    private _sendTokenResponse(userId: string, res: Response): void {
      const token = this.jwtService.sign({ sub: userId })
      res.redirect(`http://localhost:4200/auth/login?id_token=${token}`);
    }
}
