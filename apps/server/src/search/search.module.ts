import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { ProviderService } from 'src/provider/provider.service';
import { SpotifyService } from 'src/spotify/spotify.service';

import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [DrizzleModule],
  controllers: [SearchController],
  providers: [SearchService, SpotifyService, ProviderService],
})
export class SearchModule {}
