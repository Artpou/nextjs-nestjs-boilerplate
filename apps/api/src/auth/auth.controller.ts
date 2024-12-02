import { Body, Controller, Post, Request, UseGuards, Get, Req } from '@nestjs/common';
import { CreateUserDto, LoginDto } from '@repo/dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './refresh.guard';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@Req() request) {
    return { message: 'hello' };
  }

  @Post('register')
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    console.log('refreshed');

    return await this.authService.refreshToken(req.user);
  }
}
