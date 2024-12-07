import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Req() _request): Promise<{ message: string }> {
    return { message: this.appService.getHello() };
  }
}
