import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { HelloWorldResponse } from 'response';
import { getAuth, verifyToken } from '@clerk/fastify';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Req() request): Promise<HelloWorldResponse> {
    const { userId } = getAuth(request);

    return { message: `User ID: ${userId}` };
  }
}
