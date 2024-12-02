import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ClerkAuthGuard } from './clerk-auth.guard';

import { HelloWorldResponse } from 'response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(ClerkAuthGuard)
  async getHello(): Promise<HelloWorldResponse> {
    return { message: 'Hello World' };
  }
}
