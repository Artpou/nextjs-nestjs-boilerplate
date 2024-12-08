import type { DrizzleDB } from 'src/drizzle/types/drizzle';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import { users } from '@db/schema';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { jwtDecode } from 'jwt-decode';

import {
  LoginDto,
  LoginResponse,
  RefreshDto,
  RefreshResponse,
} from './auth.dto';

const ACCESS_TOKEN_EXPIRE_TIME = '30m';
const REFRESH_TOKEN_EXPIRE_TIME = '7d';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    dto: LoginDto,
  ): Promise<typeof users.$inferSelect | undefined> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, dto.email),
    });

    if (user && (await compare(dto.password, user.password))) {
      return user;
    } else {
      return undefined;
    }
  }

  async login(dto: LoginDto): Promise<LoginResponse> {
    const user = await this.validateUser(dto);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user.email,
      iat: Math.floor(Date.now() / 1000),
    };

    return {
      ...user,
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
        secret: process.env.JWT_SECRET,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
        secret: process.env.JWT_REFRESH_SECRET,
      }),
    };
  }

  async refreshToken(dto: RefreshDto): Promise<RefreshResponse> {
    const { exp, ...payload } = jwtDecode(dto.refresh);

    if (!payload.sub) throw new UnauthorizedException('Invalid token');

    const newPayload = {
      ...payload,
      iat: Math.floor(Date.now() / 1000),
    };

    return {
      email: payload.sub,
      accessToken: await this.jwtService.signAsync(newPayload, {
        expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
        secret: process.env.JWT_SECRET,
      }),
      refreshToken: await this.jwtService.signAsync(newPayload, {
        expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
        secret: process.env.JWT_REFRESH_SECRET,
      }),
    };
  }
}
