import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local.auth.guard';
import { SignInDto } from './auth.dto';
import { AuthService } from './auth.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(CacheInterceptor)
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

  @UseInterceptors(CacheInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('validate')
  async validate(@Body() signUpDto: SignInDto) {
    return this.authService.validateUser(signUpDto.username, signUpDto.password);
  }
}
