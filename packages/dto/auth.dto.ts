import { Expose } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
  @IsString()
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
