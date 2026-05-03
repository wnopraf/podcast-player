import type { Episode } from '@domain/entities/Episode';
import { EpisodeQueueEntity, type EpisodeQueue } from '@domain/entities/EpisodeQueue';

export class EpisodeQueueService {
  createQueue(episodes: Episode[], startIndex: number = 0): EpisodeQueue {
    if (episodes.length === 0) {
      return new EpisodeQueueEntity([], 0, false);
    }

    const clampedIndex = Math.max(0, Math.min(startIndex, episodes.length - 1));
    return new EpisodeQueueEntity([...episodes], clampedIndex, false);
  }

  next(queue: EpisodeQueue): EpisodeQueue {
    if (!queue.hasNext) {
      return queue;
    }

    return new EpisodeQueueEntity(queue.episodes, queue.currentIndex + 1, queue.isShuffle);
  }

  previous(queue: EpisodeQueue): EpisodeQueue {
    if (!queue.hasPrevious) {
      return queue;
    }

    return new EpisodeQueueEntity(queue.episodes, queue.currentIndex - 1, queue.isShuffle);
  }

  toggleShuffle(queue: EpisodeQueue): EpisodeQueue {
    if (queue.isShuffle) {
      return this.unshuffle(queue);
    }
    return this.shuffle(queue);
  }

  private shuffle(queue: EpisodeQueue): EpisodeQueue {
    if (queue.episodes.length <= 1) {
      return new EpisodeQueueEntity(queue.episodes, queue.currentIndex, true);
    }

    const currentEpisode = queue.currentEpisode;
    const otherEpisodes = queue.episodes.filter((_, index) => index !== queue.currentIndex);

    const shuffledOthers = this.shuffleArray(otherEpisodes);
    const newEpisodes = [currentEpisode, ...shuffledOthers].filter(Boolean) as Episode[];

    return new EpisodeQueueEntity(newEpisodes, 0, true);
  }

  private unshuffle(queue: EpisodeQueue): EpisodeQueue {
    const currentEpisode = queue.currentEpisode;
    const otherEpisodes = queue.episodes.filter((ep) => ep !== currentEpisode);

    const sortedOthers = this.sortByReleaseDate(otherEpisodes);
    // No null episodes
    const newEpisodes = [currentEpisode, ...sortedOthers].filter(Boolean) as Episode[];

    const newIndex = newEpisodes.indexOf(currentEpisode as Episode);

    return new EpisodeQueueEntity(newEpisodes, newIndex, false);
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private sortByReleaseDate(episodes: Episode[]): Episode[] {
    return [...episodes].sort((a, b) => {
      const dateA = new Date(a.releaseDate).getTime();
      const dateB = new Date(b.releaseDate).getTime();
      return dateB - dateA;
    });
  }
}
