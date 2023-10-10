import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail()
  username: string;
  @IsNotEmpty()
  password: string;
}