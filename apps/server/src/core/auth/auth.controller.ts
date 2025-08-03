import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { User, UserEntity } from '../../modules/user/user.model';

import { UserService } from '@/modules/user/user.service';

import type { AuthenticatedRequest } from './auth';
import {
  LoginDto,
  RefreshDto,
  RegisterDto,
  TokenResponse,
  TokenResponseDto,
} from './auth.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

const entity = new UserEntity();

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
  @ApiOkResponse({ type: entity.selectDto })
  async me(@Request() req: AuthenticatedRequest): Promise<User | undefined> {
    return await this.userService.findById(req.user.id);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout() {
    // In a stateless JWT setup, logout is handled client-side
    // by removing the token. The server doesn't need to do anything.
    return { message: 'Logged out successfully' };
  }
}
