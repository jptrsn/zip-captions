import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CacheService } from '../app/services/cache/cache.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private cache: CacheService,
  ) {}

  async signIn(username: string, password: string): Promise<{uuid: string, username: string, access_token: string}> {
    const user = await this.validateUser(username, password);
    const accessToken = await this.jwtService.signAsync(user);
    return { ...user, access_token: accessToken };
  }

  async getUser(username: string): Promise<{uuid: string, username: string, access_token: string}> {
    const userDoc = await this.cache.wrap(`${username}_user`, () => this.userService.findOne({username}))
    const rtn = {uuid: userDoc.uuid, username: userDoc.username};
    const accessToken = await this.jwtService.signAsync(rtn);
    return { ...rtn, access_token: accessToken };
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

  async signUp(username: string, password: string): Promise<{ access_token: string }> {
    const existingUser = await this.userService.findOne({username});
    if (existingUser) {
      throw new BadRequestException('Bad request');
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await this.userService.createUser(username, hashedPassword);
    const payload = { uuid: newUser.uuid, username: newUser.username};
    const accessToken = await this.jwtService.signAsync(payload);
    return { access_token: accessToken }
  }
}
