import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findById(email);
  }

  async signUp(email: string, hashedPassword: string): Promise<{ access_token: string }> {
    const newUser = await this.userService.createUser(email, hashedPassword);
    const payload = { id: newUser.id, email: newUser.email};
    const accessToken = await this.jwtService.signAsync(payload);
    return { access_token: accessToken }
  }
}
