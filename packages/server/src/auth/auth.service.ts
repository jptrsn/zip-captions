import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CacheService } from '../app/services/cache/cache.service';
import { jwtConstants } from './constants';
import { DecodedToken, SignInTokenResponse } from 'shared-ui';
@Injectable()
export class AuthService {
  
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private cache: CacheService,
  ) {}

  async signIn(username: string, password: string): Promise<{uuid: string; username: string;}> {
    const user = await this.validateUser(username, password);
    return { uuid: user.uuid, username: user.username };
  }

  async getUser(username: string): Promise<{uuid: string, username: string}> {
    const userDoc = await this.cache.wrap(`${username}_user`, () => this.userService.findOne({username}))
    return {uuid: userDoc.uuid, username: userDoc.username};
  }

  async getUserById(id: string, username?: string): Promise<{uuid: string, username: string}> {
    const userDoc = await this.cache.wrap(`${username}_user`, () => this.userService.findById(id))
    return {uuid: userDoc.uuid, username: userDoc.username};
  }

  async validateUser(username: string, password: string): Promise<{uuid: string, username: string}> {
    const user = await this.cache.wrap(`${username}_user`, () => this.userService.findOne({username}))
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const passwordValid = await bcrypt.compare(password, user.hash);
    if (passwordValid) {
      return {
        uuid: user.uuid,
        username: user.username,
      }
    }
    return null;
  }

  async signUp(username: string, password: string): Promise<{ uuid: string, username: string }> {
    const existingUser = await this.userService.findOne({username});
    if (existingUser) {
      throw new BadRequestException('Bad request');
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await this.userService.createUser(username, hashedPassword);
    return {uuid: newUser.uuid, username: newUser.username }
  }

  async connectGoogle(token: SignInTokenResponse): Promise<{uuid: string, username: string}> {
    const decoded: DecodedToken | null = await this.jwtService.decode(token.credential) as DecodedToken | null;
    if (!decoded) {
      throw new BadRequestException('Invalid Token')
    }
    const user = await this.cache.wrap(
      `google_token_${decoded.sub}`,
      () => this.userService.addGoogleUser(decoded)
    )
    return { uuid: user.uuid, username: user.username };
  }

  async decodeToken(token: SignInTokenResponse): Promise<DecodedToken | null> {
    return await this.jwtService.decode(token.credential) as DecodedToken | null;
  }

  private async _getAccessToken(uuid: string, email: string): Promise<{access_token: string;}> {
    const accessToken = await this.jwtService.signAsync({ sub: uuid, email }, { expiresIn: `${jwtConstants.expires * 1000}` });
    return { access_token: accessToken }
  }
}
