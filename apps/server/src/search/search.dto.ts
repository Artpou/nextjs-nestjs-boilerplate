import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import {
  AlbumSchema,
  ArtistSchema,
  TrackSchema,
} from 'src/spotify/spotify.dto';

export class SearchQueryDto extends createZodDto(
  z.object({
    search: z.string().min(2),
    type: z.enum(['artist', 'album', 'track']).default('artist'),
  }),
) {}

export class SearchResponse extends createZodDto(
  z.object({
    items: z.array(z.union([AlbumSchema, TrackSchema, ArtistSchema])),
  }),
) {}
