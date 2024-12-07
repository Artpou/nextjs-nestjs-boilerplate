import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const testSchema = z.object({
  id: z.number(),
});
class TestDto extends createZodDto(testSchema) {}

@Controller('tester')
export class TesterController {
  @Get('get')
  async test(): Promise<{ momo: string }> {
    return { momo: 'momo' };
  }

  @Post('post')
  @ApiOkResponse({ type: TestDto })
  async post(@Body() dto: TestDto): Promise<TestDto> {
    throw new Error('test');
    return { id: dto.id };
  }
}
