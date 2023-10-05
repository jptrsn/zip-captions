import { Body, Controller, Get, Request, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local.auth.guard';
import { SignInDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from '../guards/authenticated.guard';

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
    const token = await this.authService.signUp(signUpDto.username.toLowerCase(), signUpDto.password);
    return {
      msg: 'user successfully registered',
      token
    }
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthenticatedGuard)
  @Post('validate')
  async validate(@Body() signUpDto: SignInDto) {
    return this.authService.validateUser(signUpDto.username, signUpDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Get('logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { message: 'The user session has ended' };
  }
}
