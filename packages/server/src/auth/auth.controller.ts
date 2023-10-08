import { Request, Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, BadRequestException } from '@nestjs/common';
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
  async validate(@Request() req, @Body() signUpDto: SignInDto) {
    if (req.session.passport.user.username !== signUpDto.username) {
      throw new BadRequestException('Invalid');
    }
    return this.authService.validateUser(signUpDto.username, signUpDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Get('logout')
  @UseGuards(AuthenticatedGuard)
  logout(@Request() req): { message: string } {
    req.session.destroy();
    return { message: 'The user session has ended' };
  }
}
