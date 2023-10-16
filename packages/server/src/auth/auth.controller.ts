import { Request, Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, BadRequestException } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local.auth.guard';
import { SignInDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { SignInTokenResponse } from 'shared-ui';
import { GoogleTokenGuard } from '../guards/google-token.guard';
import { CacheTTL } from '@nestjs/cache-manager';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Body() body: { username: string, password: string}) {
    return await this.authService.signIn(body.username, body.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() signUpDto: SignInDto) {
    return await this.authService.signUp(signUpDto.username.toLowerCase(), signUpDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthenticatedGuard)
  @Post('validate')
  async validate(@Request() req, @Body() signUpDto: SignInDto) {
    if (req.session.passport.user.username !== signUpDto.username) {
      throw new BadRequestException('Invalid');
    }
    return this.authService.validateUser(signUpDto.username, signUpDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthenticatedGuard)
  @Get('session')
  @CacheTTL(1)
  async checkSession(@Request() req) {
    console.log('check session', req.session)
    return req.session.passport.user;
  }

  @HttpCode(HttpStatus.OK)
  @Get('logout')
  @UseGuards(AuthenticatedGuard)
  logout(@Request() req): { message: string } {
    console.log('logout')
    req.session.destroy();
    return { message: 'The user session has ended' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('loginWithGoogle')
  @UseGuards(GoogleTokenGuard)
  loginWithGoogle(@Body() body: { creds: SignInTokenResponse }) {
    return this.authService.connectGoogle(body.creds);
  }
}
