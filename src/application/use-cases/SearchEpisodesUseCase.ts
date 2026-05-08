import { FilterService } from '@domain/services/FilterService';
import type { Episode } from '@domain/entities/Episode';

export class SearchEpisodesUseCase {
  execute(
    episodes: Episode[],
    searchTerm: string,
    searchFields: (keyof Episode)[] = ['title', 'topic']
  ): Episode[] {
    return FilterService.byText(episodes, searchTerm, searchFields);
  }
}
