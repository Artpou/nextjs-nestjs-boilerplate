import type { SearchQueryDto, SearchResponse } from './search.dto';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/auth/auth';
import { SpotifyService } from 'src/spotify/spotify.service';

@Injectable()
export class SearchService {
  constructor(private spotifyService: SpotifyService) {}

  async search(
    req: AuthenticatedRequest,
    query: SearchQueryDto,
  ): Promise<SearchResponse> {
    if (req.provider!.name === 'spotify') {
      const data = await this.spotifyService.search(
        req.provider!.access_token,
        query,
      );

      if (query.type === 'track') return { items: data.tracks?.items || [] };
      if (query.type === 'artist') return { items: data.artists?.items || [] };
      if (query.type === 'album') return { items: data.albums?.items || [] };
    }

    throw new UnauthorizedException('Unsupported provider');
  }
}
