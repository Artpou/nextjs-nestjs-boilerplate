import { Injectable } from '@nestjs/common';
import { SearchQueryDto } from 'src/search/search.dto';

import { SearchResults } from './spotify.dto';

@Injectable()
export class SpotifyService {
  private readonly API_URL = 'https://api.spotify.com/v1';

  async refreshToken(
    accessToken: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const response = await fetch(`${this.API_URL}/me/refresh_token`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`);
    }

    return response.json();
  }

  async search(
    accessToken: string,
    { search, type }: SearchQueryDto,
  ): Promise<SearchResults> {
    const response = await fetch(
      `${this.API_URL}/search?q=${encodeURIComponent(
        search,
      )}&type=${type}&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`);
    }

    return response.json();
  }
}
