import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('me')
@Controller('me')
export class MeController {
  // hello world
  @Get()
  async helloWorld() {
    return {
      message: 'Hello World',
    };
  }
}
