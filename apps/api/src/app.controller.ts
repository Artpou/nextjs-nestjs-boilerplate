import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { HelloWorldResponse } from 'response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Req() request): Promise<HelloWorldResponse> {
    return { message: this.appService.getHello() };
  }
}
