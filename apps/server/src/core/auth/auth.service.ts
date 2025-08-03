import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../modules/user/user.model';

import { UserService } from '@/modules/user/user.service';

import {
  LoginBody,
  RefreshBody,
  RegisterBody,
  TokenResponse,
} from './auth.dto';

const ACCESS_TOKEN_EXPIRE_TIME = '30m';
const REFRESH_TOKEN_EXPIRE_TIME = '59m';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}

  private async getTokens(
    id: string | number,
  ): Promise<Omit<TokenResponse, 'email'>> {
    const expires_in = Date.now() + 30 * 60 * 1000; // 30 minutes in milliseconds

    const [access_token, refresh_token] = await Promise.all([
      await this.jwtService.signAsync(
        { sub: id },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
        },
      ),
      await this.jwtService.signAsync(
        { sub: id },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
      expires_in,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findWithPassword(email);
    if (!user || !user.password)
      throw new UnauthorizedException('Invalid credentials');

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(values: LoginBody): Promise<TokenResponse> {
    const user = await this.validateUser(values.email, values.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.getTokens(user.id);

    return { ...tokens, email: user.email };
  }

  async register(values: RegisterBody): Promise<TokenResponse> {
    const user = await this.usersService.create({
      email: values.email,
      password: values.password,
    });

    if (!user) throw new UnauthorizedException('User not found');

    const tokens = await this.getTokens(user.id);

    return { ...tokens, email: user.email };
  }

  async refreshToken(values: RefreshBody): Promise<TokenResponse> {
    const test = jwtDecode(values.refresh);

    if (!test.sub || !test.exp)
      throw new UnauthorizedException('Invalid token');

    const isExpired = Date.now() > test.exp * 1000;
    if (isExpired) throw new UnauthorizedException('Token expired');

    const user = await this.usersService.findById(test.sub);

    if (!user) throw new UnauthorizedException('User not found');

    const tokens = await this.getTokens(user.id);

    return { ...tokens, email: user.email };
  }
}
