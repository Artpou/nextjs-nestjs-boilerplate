import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Cache } from 'cache-manager';

@ApiTags('me')
@Controller('me')
export class MeController {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  // hello world
  @Get()
  async helloWorld() {
    return {
      message: 'Hello World',
    };
  }
}
