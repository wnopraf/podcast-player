import { FilterService } from '@domain/services/FilterService';
import type { Podcast } from '@domain/entities/Podcast';

export type PodcastOrderBy = 'releaseDate' | 'title' | 'author';

export class OrderPodcastsUseCase {
  execute(
    podcasts: Podcast[],
    orderBy: PodcastOrderBy = 'releaseDate',
    orderDirection: 'asc' | 'desc' = 'desc'
  ): Podcast[] {
    return FilterService.orderBy(podcasts, orderBy, orderDirection);
  }
}
