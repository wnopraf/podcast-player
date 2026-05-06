import { describe, it, expect } from 'vitest';
import { EpisodeQueueService } from '../EpisodeQueueService';
import { EpisodeQueueEntity } from '@domain/entities/EpisodeQueue';
import { createMockEpisode, createMockEpisodes } from '@test/mocks/episodeMocks';

describe('EpisodeQueueService', () => {
  const mockEpisodes = createMockEpisodes(3);

  it('should create a queue with episodes starting at index 0', () => {
    const service = new EpisodeQueueService();
    const queue = service.createQueue(mockEpisodes, 0);

    expect(queue.episodes).toEqual(mockEpisodes);
    expect(queue.currentIndex).toBe(0);
    expect(queue.isShuffle).toBe(false);
  });

  it('should create a queue with episodes starting at specific index', () => {
    const service = new EpisodeQueueService();
    const queue = service.createQueue(mockEpisodes, 1);

    expect(queue.episodes).toEqual(mockEpisodes);
    expect(queue.currentIndex).toBe(1);
  });

  it('should clamp start index to valid range', () => {
    const service = new EpisodeQueueService();
    const queue = service.createQueue(mockEpisodes, 10);

    expect(queue.currentIndex).toBe(2); // Last valid index
  });

  it('should clamp negative start index to 0', () => {
    const service = new EpisodeQueueService();
    const queue = service.createQueue(mockEpisodes, -5);

    expect(queue.currentIndex).toBe(0);
  });

  it('should create an empty queue when episodes array is empty', () => {
    const service = new EpisodeQueueService();
    const queue = service.createQueue([], 0);

    expect(queue.episodes).toEqual([]);
    expect(queue.currentIndex).toBe(0);
    expect(queue.isEmpty).toBe(true);
  });

  it('should move to next episode', () => {
    const service = new EpisodeQueueService();
    const queue = service.createQueue(mockEpisodes, 0);
    const nextQueue = service.next(queue);

    expect(nextQueue.currentIndex).toBe(1);
    expect(nextQueue.episodes).toEqual(mockEpisodes);
  });

  it('should not move to next when at last episode', () => {
    const service = new EpisodeQueueService();
    const queue = service.createQueue(mockEpisodes, 2);
    const nextQueue = service.next(queue);

    expect(nextQueue.currentIndex).toBe(2);
  });

  it('should move to previous episode', () => {
    const service = new EpisodeQueueService();
    const queue = service.createQueue(mockEpisodes, 2);
    const prevQueue = service.previous(queue);

    expect(prevQueue.currentIndex).toBe(1);
  });

  it('should not move to previous when at first episode', () => {
    const service = new EpisodeQueueService();
    const queue = service.createQueue(mockEpisodes, 0);
    const prevQueue = service.previous(queue);

    expect(prevQueue.currentIndex).toBe(0);
  });

  it('should toggle shuffle from off to on', () => {
    const service = new EpisodeQueueService();
    const queue = service.createQueue(mockEpisodes, 0);
    const shuffledQueue = service.toggleShuffle(queue);

    expect(shuffledQueue.isShuffle).toBe(true);
    expect(shuffledQueue.currentIndex).toBe(0);
  });

  it('should toggle shuffle from on to off', () => {
    const service = new EpisodeQueueService();
    const queue = new EpisodeQueueEntity(mockEpisodes, 0, true);
    const unshuffledQueue = service.toggleShuffle(queue);

    expect(unshuffledQueue.isShuffle).toBe(false);
  });

  it('should keep current episode at index 0 when shuffling', () => {
    const service = new EpisodeQueueService();
    const queue = service.createQueue(mockEpisodes, 1);
    const originalEpisode = queue.currentEpisode;
    const shuffledQueue = service.toggleShuffle(queue);

    expect(shuffledQueue.currentEpisode?.id).toBe(originalEpisode?.id);
    expect(shuffledQueue.currentIndex).toBe(0);
  });

  it('should sort by release date when unshuffling', () => {
    const service = new EpisodeQueueService();
    const orderedEpisodes = [
      createMockEpisode({ releaseDate: '2024-01-03' }),
      createMockEpisode({ releaseDate: '2024-01-02' }),
      createMockEpisode({ releaseDate: '2024-01-01' }),
    ];
    const queue = service.createQueue(orderedEpisodes, 0);
    const shuffledQueue = service.toggleShuffle(queue);
    const unshuffledQueue = service.toggleShuffle(shuffledQueue);

    expect(unshuffledQueue.isShuffle).toBe(false);
    // Verify they are sorted by release date descending
    expect(unshuffledQueue.episodes[0].releaseDate).toBe('2024-01-03');
    expect(unshuffledQueue.episodes[1].releaseDate).toBe('2024-01-02');
    expect(unshuffledQueue.episodes[2].releaseDate).toBe('2024-01-01');
  });
});
