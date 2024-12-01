import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { HelloWorldResponse } from 'response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<HelloWorldResponse> {
    return await this.appService.getHello();
  }
}
