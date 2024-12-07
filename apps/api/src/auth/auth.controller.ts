import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './refresh.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  LoginDto,
  RegisterDto,
  RefreshDto,
  LoginResponse,
  UserResponse,
  RefreshResponse,
} from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  @ApiOkResponse({ type: RegisterDto })
  async registerUser(@Body() dto: RegisterDto): Promise<UserResponse> {
    return await this.userService.create(dto);
  }

  @Post('login')
  @ApiOkResponse({ type: LoginResponse })
  async login(@Body() dto: LoginDto): Promise<LoginResponse> {
    return await this.authService.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  @ApiOkResponse({ type: RefreshResponse })
  async refreshToken(@Body() dto: RefreshDto): Promise<RefreshResponse> {
    return await this.authService.refreshToken(dto);
  }
}
