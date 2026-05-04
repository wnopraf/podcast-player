import { describe, it, expect } from 'vitest';
import { EpisodeQueueEntity } from '../EpisodeQueue';
import { createMockEpisodes } from '@test/mocks/episodeMocks';

describe('EpisodeQueueEntity', () => {
  const mockEpisodes = createMockEpisodes(3);

  it('should create a queue with episodes', () => {
    const queue = new EpisodeQueueEntity(mockEpisodes, 0, false);

    expect(queue.episodes).toEqual(mockEpisodes);
    expect(queue.currentIndex).toBe(0);
    expect(queue.isShuffle).toBe(false);
  });

  it('should create a queue with default values', () => {
    const queue = new EpisodeQueueEntity(mockEpisodes);

    expect(queue.currentIndex).toBe(0);
    expect(queue.isShuffle).toBe(false);
  });

  it('should return current episode correctly', () => {
    const queue = new EpisodeQueueEntity(mockEpisodes, 1, false);

    expect(queue.currentEpisode).toEqual(mockEpisodes[1]);
  });

  it('should return null for current episode when index is out of bounds', () => {
    const queue = new EpisodeQueueEntity(mockEpisodes, 10, false);

    expect(queue.currentEpisode).toBeNull();
  });

  it('should return true for hasNext when not at last episode', () => {
    const queue = new EpisodeQueueEntity(mockEpisodes, 0, false);

    expect(queue.hasNext).toBe(true);
  });

  it('should return false for hasNext when at last episode', () => {
    const queue = new EpisodeQueueEntity(mockEpisodes, 2, false);

    expect(queue.hasNext).toBe(false);
  });

  it('should return true for hasPrevious when not at first episode', () => {
    const queue = new EpisodeQueueEntity(mockEpisodes, 1, false);

    expect(queue.hasPrevious).toBe(true);
  });

  it('should return false for hasPrevious when at first episode', () => {
    const queue = new EpisodeQueueEntity(mockEpisodes, 0, false);

    expect(queue.hasPrevious).toBe(false);
  });

  it('should return true for isEmpty when episodes array is empty', () => {
    const queue = new EpisodeQueueEntity([], 0, false);

    expect(queue.isEmpty).toBe(true);
  });

  it('should return false for isEmpty when episodes array is not empty', () => {
    const queue = new EpisodeQueueEntity(mockEpisodes, 0, false);

    expect(queue.isEmpty).toBe(false);
  });

  it('should handle negative index', () => {
    const queue = new EpisodeQueueEntity(mockEpisodes, -1, false);

    expect(queue.currentEpisode).toBeNull();
  });
});
