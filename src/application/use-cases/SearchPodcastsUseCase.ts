import { FilterService } from '@domain/services/FilterService';
import type { Podcast } from '@domain/entities/Podcast';

export class SearchPodcastsUseCase {
  execute(
    podcasts: Podcast[],
    searchTerm: string,
    searchFields: (keyof Podcast)[] = ['title', 'author', 'primaryGenreName']
  ): Podcast[] {
    return FilterService.byText(podcasts, searchTerm, searchFields);
  }
}
