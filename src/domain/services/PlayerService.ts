export interface AudioPlayer {
  load(url: string): Promise<void>;
  play(): Promise<void>;
  pause(): void;
  seek(time: number): void;
  setVolume(volume: number): void;
  getCurrentTime(): number;
  getDuration(): number;
  isPlaying(): boolean;
  destroy(): void;
}

export class PlayerService {
  private audioPlayer: AudioPlayer | null = null;
  private DEFAULT_ERROR_MSG = 'Audio player not initialized';
  currentEpisodeId: string | null = null;

  constructor(audioPlayer: AudioPlayer) {
    this.audioPlayer = audioPlayer;
  }

  async playEpisode(episodeId: string, streamUrl: string): Promise<void> {
    if (!this.audioPlayer) throw new Error(this.DEFAULT_ERROR_MSG);

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

  getCurrentEpisodeId(): string | null {
    return this.currentEpisodeId;
  }

  destroy(): void {
    if (this.audioPlayer) {
      this.audioPlayer.destroy();
      this.audioPlayer = null;
    }
    this.currentEpisodeId = null;
  }
}
