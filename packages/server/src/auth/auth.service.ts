import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findById(email);
  }

  async signUp(email: string, hashedPassword: string): Promise<{id: string, email: string}> {
    const newUser = await this.userService.createUser(email, hashedPassword);
    return { id: newUser.id, email: newUser.email};
  }
}
