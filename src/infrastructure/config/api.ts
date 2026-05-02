export const API_CONFIG = {
  baseURL: import.meta.env.VITE_ITUNES_API_BASE_URL || 'https://itunes.apple.com',
  timeout: Number(import.meta.env.VITE_ITUNES_API_TIMEOUT) || 10000,
  endpoints: {
    search: '/search',
    lookup: (id: string) => `/lookup?id=${id}`,
    podcasts: {
      search: (term: string, limit: number = 20) =>
        `/search?term=${encodeURIComponent(term)}&media=podcast&entity=podcast&limit=${limit}`,
      lookup: (id: string) => `/lookup?id=${id}&media=podcast`,
    },
    episodes: {
      lookup: (collectionId: string, limit: number = 50) =>
        `/lookup?id=${collectionId}&entity=podcastEpisode&limit=${limit}`,
    },
  },
} as const;
