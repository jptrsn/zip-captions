import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() signUpDto: Record<string, any>) {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10)
    const { id, email } = await this.authService.signUp(signUpDto.email, hashedPassword);
    return {
      msg: 'user successfully registered',
      id,
      email
    }

  }
}
