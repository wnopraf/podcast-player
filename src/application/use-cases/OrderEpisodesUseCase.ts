import { FilterService } from '@domain/services/FilterService';
import type { Episode } from '@domain/entities/Episode';

export type EpisodeOrderBy = 'releaseDate' | 'title' | 'trackTimeMillis';

export class OrderEpisodesUseCase {
  execute(
    episodes: Episode[],
    orderBy: EpisodeOrderBy = 'releaseDate',
    orderDirection: 'asc' | 'desc' = 'desc'
  ): Episode[] {
    return FilterService.orderBy(episodes, orderBy, orderDirection);
  }
}
