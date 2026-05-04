import type { Episode } from '@domain/entities/Episode';
import { EpisodeQueueService } from '@domain/services/EpisodeQueueService';
import type { EpisodeQueue } from '@domain/entities/EpisodeQueue';

export interface AudioPlayer {
  load(url: string): Promise<void>;
  play(): Promise<void>;
  pause(): void;
  seek(time: number): void;
  setVolume(volume: number): void;
  getCurrentTime(): number;
  getDuration(): number;
  isPlaying(): boolean;
  onTimeUpdate(callback: (time: number) => void): void;
  onEnded(callback: () => void): void;
  destroy(): void;
}

export class PlayerService {
  private audioPlayer: AudioPlayer | null = null;
  private queueService: EpisodeQueueService;
  private DEFAULT_ERROR_MSG = 'Audio player not initialized';
  currentEpisodeId: string | null = null;
  private queue: EpisodeQueue | null = null;
  private onTimeUpdateCallback?: (time: number) => void;
  private onEpisodeEndedCallback?: () => void;

  constructor(audioPlayer: AudioPlayer, queueService: EpisodeQueueService) {
    this.audioPlayer = audioPlayer;
    this.queueService = queueService;
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    if (!this.audioPlayer) return;

    this.audioPlayer.onTimeUpdate((time) => {
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(time);
      }
    });

    this.audioPlayer.onEnded(async () => {
      await this.playNext();
      if (this.onEpisodeEndedCallback) {
        this.onEpisodeEndedCallback();
      }
    });
  }

  async playEpisode(episodes: Episode[], episodeId: string, streamUrl: string): Promise<void> {
    if (!this.audioPlayer) throw new Error(this.DEFAULT_ERROR_MSG);

    const startIndex = episodes.findIndex((ep) => ep.id === episodeId);
    this.queue = this.queueService.createQueue(episodes, startIndex);

    this.currentEpisodeId = episodeId;
    await this.audioPlayer.load(streamUrl);
    await this.audioPlayer.play();
  }

  async pause(): Promise<void> {
    if (!this.audioPlayer) throw new Error(this.DEFAULT_ERROR_MSG);
    this.audioPlayer.pause();
  }

  async resume(): Promise<void> {
    if (!this.audioPlayer) throw new Error(this.DEFAULT_ERROR_MSG);
    if (!this.isPlaying()) {
      await this.audioPlayer.play();
    }
  }

  seekTo(time: number): void {
    if (!this.audioPlayer) throw new Error(this.DEFAULT_ERROR_MSG);
    this.audioPlayer.seek(time);
  }

  setVolume(volume: number): void {
    if (!this.audioPlayer) throw new Error(this.DEFAULT_ERROR_MSG);
    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.audioPlayer.setVolume(clampedVolume);
  }

  getCurrentPosition(): number {
    if (!this.audioPlayer) throw new Error(this.DEFAULT_ERROR_MSG);
    return this.audioPlayer.getCurrentTime();
  }

  getDuration(): number {
    if (!this.audioPlayer) throw new Error(this.DEFAULT_ERROR_MSG);
    return this.audioPlayer.getDuration();
  }

  isPlaying(): boolean {
    if (!this.audioPlayer) return false;
    return this.audioPlayer.isPlaying();
  }

  async playNext(): Promise<void> {
    if (!this.queue || !this.queue.hasNext) {
      return;
    }

    this.queue = this.queueService.next(this.queue);
    const nextEpisode = this.queue.currentEpisode;

    if (nextEpisode && nextEpisode.streamUrl) {
      await this.playEpisode(this.queue.episodes, nextEpisode.id, nextEpisode.streamUrl);
    }
  }

  async playPrevious(): Promise<void> {
    if (!this.queue || !this.queue.hasPrevious) {
      return;
    }

    this.queue = this.queueService.previous(this.queue);
    const previousEpisode = this.queue.currentEpisode;

    if (previousEpisode && previousEpisode.streamUrl) {
      await this.playEpisode(this.queue.episodes, previousEpisode.id, previousEpisode.streamUrl);
    }
  }

  toggleShuffle(): void {
    if (!this.queue) {
      return;
    }

    this.queue = this.queueService.toggleShuffle(this.queue);
  }

  getQueue(): EpisodeQueue | null {
    return this.queue;
  }

  onTimeUpdate(callback: (time: number) => void): void {
    this.onTimeUpdateCallback = callback;
  }

  onEpisodeEnded(callback: () => void): void {
    this.onEpisodeEndedCallback = callback;
  }

  getCurrentEpisodeId(): string | null {
    return this.currentEpisodeId;
  }

  destroy(): void {
    if (this.audioPlayer) {
      this.audioPlayer.destroy();
      this.audioPlayer = null;
    }
    this.currentEpisodeId = null;
    this.queue = null;
  }
}
