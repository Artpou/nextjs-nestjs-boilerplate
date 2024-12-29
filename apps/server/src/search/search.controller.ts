import type { AuthenticatedRequest } from 'src/auth/auth';

import {
  Controller,
  Get,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import ms from 'ms';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ProviderGuard } from 'src/provider/provider.guard';

import { SearchService } from './search.service';
import { SearchResponse } from './search.dto';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  @UseGuards(JwtAuthGuard, ProviderGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(ms('3h'))
  @ApiOkResponse({ type: SearchResponse })
  async search(
    @Request() req: AuthenticatedRequest,
    @Query('search') search: string,
    @Query('type') type: 'artist' | 'album' | 'track',
  ): Promise<SearchResponse> {
    return await this.searchService.search(req, { search, type });
  }
}
