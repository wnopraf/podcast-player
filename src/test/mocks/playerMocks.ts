import { vi } from 'vitest';
import type { AudioPlayer } from '@domain/services/PlayerService';

export const createMockAudioPlayer = (): AudioPlayer => ({
  load: vi.fn().mockResolvedValue(undefined),
  play: vi.fn().mockResolvedValue(undefined),
  pause: vi.fn(),
  seek: vi.fn(),
  setVolume: vi.fn(),
  getCurrentTime: vi.fn().mockReturnValue(0),
  getDuration: vi.fn().mockReturnValue(60),
  isPlaying: vi.fn().mockReturnValue(false),
  onTimeUpdate: vi.fn(),
  onEnded: vi.fn(),
  destroy: vi.fn(),
});
