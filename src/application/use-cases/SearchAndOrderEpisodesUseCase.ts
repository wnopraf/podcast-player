import { FilterService } from '../../domain/services/FilterService';
import type { Episode } from '../../domain/entities/Episode';

export type EpisodeOrderBy = 'releaseDate' | 'title' | 'trackTimeMillis';

export class SearchAndOrderEpisodesUseCase {
  execute(
    episodes: Episode[],
    searchTerm: string,
    orderBy: EpisodeOrderBy = 'releaseDate',
    orderDirection: 'asc' | 'desc' = 'desc'
  ): Episode[] {
    const filtered = FilterService.byText(episodes, searchTerm, ['title', 'topic']);
    return FilterService.orderBy(filtered, orderBy, orderDirection);
  }
}
