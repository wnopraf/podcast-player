import { describe, it, expect } from 'vitest';
import { FilterService } from '../FilterService';
import { createMockPodcast } from '@test/mocks/podcastMocks';

describe('FilterService', () => {
  const mockPodcasts = [
    createMockPodcast({
      title: 'The Tech Talk',
      author: 'John Smith',
      primaryGenreName: 'Technology',
      trackCount: 100,
    }),
    createMockPodcast({
      title: 'Banana Stories',
      author: 'Jane Doe',
      primaryGenreName: 'Comedy',
      trackCount: 50,
    }),
    createMockPodcast({
      title: 'Apple Podcast Daily',
      author: 'Bob Johnson',
      primaryGenreName: 'Technology',
      trackCount: 200,
    }),
    createMockPodcast({
      title: 'Carrot Chronicles',
      author: 'Alice Williams',
      primaryGenreName: 'Health',
      trackCount: 75,
    }),
    createMockPodcast({
      title: 'Pineapple Paradise',
      author: 'John Smith',
      primaryGenreName: 'Lifestyle',
      trackCount: 150,
    }),
  ];

  describe('byText', () => {
    it('should filter podcasts by search term in single field', () => {
      const result = FilterService.byText(mockPodcasts, 'apple', ['title']);

      expect(result).toHaveLength(2); // "Apple Podcast Daily" and "Pineapple Paradise"
      expect(result.every((podcast) => podcast.title.toLowerCase().includes('apple'))).toBe(true);
    });

    it('should filter podcasts by search term in multiple fields', () => {
      const result = FilterService.byText(mockPodcasts, 'john', ['title', 'author']);

      expect(result).toHaveLength(3); // 2 with "John Smith" + 1 with "Bob Johnson"
      expect(result.some((podcast) => podcast.author === 'John Smith')).toBe(true);
    });

    it('should be case insensitive', () => {
      const result = FilterService.byText(mockPodcasts, 'TECH', ['title']);

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('The Tech Talk');
    });

    it('should return all podcasts when search term is empty', () => {
      const result = FilterService.byText(mockPodcasts, '', ['title']);

      expect(result).toHaveLength(5);
    });

    it('should return empty array when no matches found', () => {
      const result = FilterService.byText(mockPodcasts, 'xyz', ['title']);

      expect(result).toHaveLength(0);
    });

    it('should handle non-string fields gracefully', () => {
      const result = FilterService.byText(mockPodcasts, '100', ['trackCount']);

      expect(result).toHaveLength(0); // trackCount is number, not string
    });
  });

  describe('orderBy', () => {
    it('should order podcasts by string field in ascending order', () => {
      const result = FilterService.orderBy(mockPodcasts, 'title', 'asc');

      expect(result[0].title).toBe('Apple Podcast Daily');
      expect(result[1].title).toBe('Banana Stories');
      expect(result[2].title).toBe('Carrot Chronicles');
      expect(result[3].title).toBe('Pineapple Paradise');
      expect(result[4].title).toBe('The Tech Talk');
    });

    it('should order podcasts by string field in descending order', () => {
      const result = FilterService.orderBy(mockPodcasts, 'title', 'desc');

      expect(result[0].title).toBe('The Tech Talk');
      expect(result[1].title).toBe('Pineapple Paradise');
      expect(result[2].title).toBe('Carrot Chronicles');
      expect(result[3].title).toBe('Banana Stories');
      expect(result[4].title).toBe('Apple Podcast Daily');
    });

    it('should order podcasts by number field in ascending order', () => {
      const result = FilterService.orderBy(mockPodcasts, 'trackCount', 'asc');

      expect(result[0].trackCount).toBe(50);
      expect(result[1].trackCount).toBe(75);
      expect(result[2].trackCount).toBe(100);
      expect(result[3].trackCount).toBe(150);
      expect(result[4].trackCount).toBe(200);
    });

    it('should order podcasts by number field in descending order', () => {
      const result = FilterService.orderBy(mockPodcasts, 'trackCount', 'desc');

      expect(result[0].trackCount).toBe(200);
      expect(result[1].trackCount).toBe(150);
      expect(result[2].trackCount).toBe(100);
      expect(result[3].trackCount).toBe(75);
      expect(result[4].trackCount).toBe(50);
    });

    it('should default to ascending order', () => {
      const result = FilterService.orderBy(mockPodcasts, 'trackCount');

      expect(result[0].trackCount).toBe(50);
      expect(result[4].trackCount).toBe(200);
    });

    it('should not mutate original array', () => {
      const result = FilterService.orderBy(mockPodcasts, 'title', 'asc');

      expect(result).not.toBe(mockPodcasts);
    });

    it('should return 0 for incomparable types', () => {
      const podcasts = [
        createMockPodcast({ title: 'A', trackCount: undefined as any }),
        createMockPodcast({ title: 'B', trackCount: undefined as any }),
      ];
      const result = FilterService.orderBy(podcasts, 'trackCount', 'asc');

      expect(result).toEqual(podcasts);
    });
  });
});
