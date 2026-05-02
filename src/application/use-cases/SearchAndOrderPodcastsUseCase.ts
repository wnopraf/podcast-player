import { FilterService } from '../../domain/services/FilterService';
import type { Podcast } from '../../domain/entities/Podcast';

export type PodcastOrderBy = 'releaseDate' | 'title' | 'author';

export class SearchAndOrderPodcastsUseCase {
  execute(
    podcasts: Podcast[],
    searchTerm: string,
    orderBy: PodcastOrderBy = 'releaseDate',
    orderDirection: 'asc' | 'desc' = 'desc'
  ): Podcast[] {
    const filtered = FilterService.byText(podcasts, searchTerm, ['title', 'author', 'primaryGenreName']);
    return FilterService.orderBy(filtered, orderBy, orderDirection);
  }
}
