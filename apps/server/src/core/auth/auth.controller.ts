import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { createZodDto } from 'nestjs-zod';

import {
  LoginSchema,
  RefreshSchema,
  RegisterSchema,
} from '@workspace/request/auth.request';

import { UserService } from '@/modules/user/user.service';

import type { AuthenticatedRequest } from './auth';
import { JwtAuthGuard } from './auth.guard';
import { TokenResponse, TokenResponseSchema } from './auth.schema';
import { AuthService } from './auth.service';

class LoginDto extends createZodDto(LoginSchema) {}
class RefreshDto extends createZodDto(RefreshSchema) {}
class RegisterDto extends createZodDto(RegisterSchema) {}

class TokenResponseDto extends createZodDto(TokenResponseSchema) {}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  @ApiOkResponse({ type: TokenResponseDto })
  async register(@Body() body: RegisterDto): Promise<TokenResponse> {
    return await this.authService.register(body);
  }

  @Post('login')
  @ApiOkResponse({ type: TokenResponseDto })
  async login(@Body() body: LoginDto): Promise<TokenResponse> {
    return await this.authService.login(body);
  }

  @Post('refresh')
  @Throttle({ default: { limit: 1, ttl: 1000 } })
  @ApiOkResponse({ type: TokenResponseDto })
  async refreshToken(@Body() body: RefreshDto): Promise<TokenResponse> {
    return await this.authService.refreshToken(body);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Request() req: AuthenticatedRequest) {
    return await this.userService.findById(req.user.sub);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout() {
    // In a stateless JWT setup, logout is handled client-side
    // by removing the token. The server doesn't need to do anything.
    return { message: 'Logged out successfully' };
  }
}
