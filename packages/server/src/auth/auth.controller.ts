// import { CacheTTL } from '@nestjs/cache-manager';
// import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Response, UseGuards } from '@nestjs/common';
// import { GoogleOauthCallbackFragment } from 'shared-ui';
// import { AuthenticatedGuard } from '../guards/authenticated.guard';
// import { LocalAuthGuard } from '../guards/local.auth.guard';
// import { SignInDto } from './auth.dto';
// import { AuthService } from './auth.service';


// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   // @HttpCode(HttpStatus.OK)
//   // @UseGuards(LocalAuthGuard)
//   // @Post('login')
//   // async signIn(@Body() body: { username: string, password: string}) {
//   //   return await this.authService.signIn(body.username, body.password);
//   // }

//   // @HttpCode(HttpStatus.OK)
//   // @Post('signup')
//   // async signup(@Body() signUpDto: SignInDto) {
//   //   return await this.authService.signUp(signUpDto.username.toLowerCase(), signUpDto.password);
//   // }

//   // @HttpCode(HttpStatus.OK)
//   // @UseGuards(AuthenticatedGuard)
//   // @Post('validate')
//   // async validate(@Req() req, @Body() signUpDto: SignInDto) {
//   //   if (req.session.passport.user.username !== signUpDto.username) {
//   //     throw new BadRequestException('Invalid');
//   //   }
//   //   return this.authService.validateUser(signUpDto.username, signUpDto.password);
//   // }

//   // @HttpCode(HttpStatus.OK)
//   // @UseGuards(AuthenticatedGuard)
//   // @Get('session')
//   // @CacheTTL(1)
//   // async checkSession(@Req() req) {
//   //   return req.session.passport.user;
//   // }

//   // @HttpCode(HttpStatus.OK)
//   // @Get('logout')
//   // @UseGuards(AuthenticatedGuard)
//   // logout(@Req() req): { message: string } {
//   //   req.session.destroy();
//   //   return { message: 'The user session has ended' };
//   // }

//   // @HttpCode(HttpStatus.OK)
//   // @Post('loginWithGoogle')
//   // loginWithGoogle(@Body() body: { creds: GoogleOauthCallbackFragment }) {
//   //   return this.authService.connectGoogle(body.creds);
//   // }

//   // @HttpCode(HttpStatus.OK)
//   // @Get('google-login')
//   // googleLogin(@Response() res) {
//   //   try {
//   //     const redirectAddress = this.authService.getGoogleOauthRedirect();
//   //     res.send({url: redirectAddress});
//   //   } catch(e) {
//   //     res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e.message)
//   //   }
//   // }
// }
