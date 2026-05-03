import type { Episode } from './Episode';

export interface Queue {
  episodes: Episode[];
  currentIndex: number;
  isShuffle: boolean;
  currentEpisode: Episode | null;
  hasNext: boolean;
  hasPrevious: boolean;
  isEmpty: boolean;
}

export class QueueEntity implements Queue {
  episodes: Episode[];
  currentIndex: number;
  isShuffle: boolean;

  constructor(episodes: Episode[], currentIndex: number = 0, isShuffle: boolean = false) {
    this.episodes = episodes;
    this.currentIndex = currentIndex;
    this.isShuffle = isShuffle;
  }

  get currentEpisode(): Episode | null {
    if (this.currentIndex < 0 || this.currentIndex >= this.episodes.length) {
      return null;
    }
    return this.episodes[this.currentIndex];
  }

  get hasNext(): boolean {
    return this.currentIndex < this.episodes.length - 1;
  }

  get hasPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get isEmpty(): boolean {
    return this.episodes.length === 0;
  }
}
