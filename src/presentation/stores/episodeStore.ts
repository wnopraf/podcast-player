import { createFilterStore } from './createFilterStore';

export type EpisodeOrderBy = 'releaseDate' | 'title' | 'trackTimeMillis';

interface EpisodeFilters {
  searchTerm: string;
  orderBy: EpisodeOrderBy;
  orderDirection: 'asc' | 'desc';
}

const initialEpisodeFilters: EpisodeFilters = {
  searchTerm: '',
  orderBy: 'releaseDate',
  orderDirection: 'desc',
};

export const useEpisodeStore = createFilterStore<EpisodeFilters>(initialEpisodeFilters);
