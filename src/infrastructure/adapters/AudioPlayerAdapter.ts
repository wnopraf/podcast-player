import type { AudioPlayer } from '@domain/services/PlayerService';

export class AudioPlayerAdapter implements AudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private DEFAULT_ERROR_MSG = 'Audio element not initialized';
  private timeUpdateCallback?: (time: number) => void;
  private endedCallback?: () => void;

  constructor() {
    this.audio = new Audio();
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    if (!this.audio) return;

    this.audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
    });

    this.audio.addEventListener('stalled', () => {
      console.warn('Audio stalled');
    });

    this.audio.addEventListener('timeupdate', () => {
      if (this.timeUpdateCallback && this.audio) {
        this.timeUpdateCallback(this.audio.currentTime);
      }
    });

    this.audio.addEventListener('ended', () => {
      if (this.endedCallback) {
        this.endedCallback();
      }
    });
  }

  async load(url: string): Promise<void> {
    if (!this.audio) throw new Error(this.DEFAULT_ERROR_MSG);

    return new Promise((resolve, reject) => {
      if (!this.audio) return reject(new Error(this.DEFAULT_ERROR_MSG));

      this.audio.src = url;
      this.audio.load();

      const onCanPlay = () => {
        this.audio?.removeEventListener('canplay', onCanPlay);
        this.audio?.removeEventListener('error', onError);
        resolve();
      };

      const onError = () => {
        this.audio?.removeEventListener('canplay', onCanPlay);
        this.audio?.removeEventListener('error', onError);
        reject(new Error('Failed to load audio'));
      };

      this.audio.addEventListener('canplay', onCanPlay);
      this.audio.addEventListener('error', onError);
    });
  }

  async play(): Promise<void> {
    if (!this.audio) throw new Error(this.DEFAULT_ERROR_MSG);
    
    return this.audio.play();
  }

  pause(): void {
    if (!this.audio) throw new Error(this.DEFAULT_ERROR_MSG);
    this.audio.pause();
  }

  seek(time: number): void {
    if (!this.audio) throw new Error(this.DEFAULT_ERROR_MSG);
    this.audio.currentTime = time;
  }

  setVolume(volume: number): void {
    if (!this.audio) throw new Error(this.DEFAULT_ERROR_MSG);
    this.audio.volume = volume;
  }

  setPlaybackRate(rate: number): void {
    if (!this.audio) throw new Error(this.DEFAULT_ERROR_MSG);
    this.audio.playbackRate = rate;
  }

  getCurrentTime(): number {
    if (!this.audio) return 0;
    return this.audio.currentTime;
  }

  getDuration(): number {
    if (!this.audio) return 0;
    return this.audio.duration || 0;
  }

  isPlaying(): boolean {
    if (!this.audio) return false;
    return !this.audio.paused;
  }

  onTimeUpdate(callback: (time: number) => void): void {
    this.timeUpdateCallback = callback;
  }

  onEnded(callback: () => void): void {
    this.endedCallback = callback;
  }

  destroy(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio.load();
      this.audio = null;
    }
  }
}

