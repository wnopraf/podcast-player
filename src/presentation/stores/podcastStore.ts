import type { PodcastOrderBy } from '@application/use-cases/OrderPodcastsUseCase';
import { createFilterStore } from './createFilterStore';

interface PodcastFilters {
  searchTerm: string;
  orderBy: PodcastOrderBy;
  orderDirection: 'asc' | 'desc';
}

const initialPodcastFilters: PodcastFilters = {
  searchTerm: '',
  orderBy: 'releaseDate',
  orderDirection: 'desc',
};

export const usePodcastStore = createFilterStore<PodcastFilters>(initialPodcastFilters);
