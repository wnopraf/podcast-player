import { create } from 'zustand';
import type { Episode } from '@domain/entities/Episode';
import type { EpisodeQueue } from '@domain/entities/EpisodeQueue';
import type { PlayerService } from '@domain/services/PlayerService';
import { diContainer } from '@infrastructure/di/container';

const playerService = diContainer.resolve<PlayerService>('playerService');

interface PlayerState {
  isPlaying: boolean;
  currentEpisode: Episode | null;
  queue: EpisodeQueue | null;
  currentTime: number;
  duration: number;
  volume: number;
}

interface PlayerActions {
  playEpisode: (episodes: Episode[], episodeId: string, streamUrl: string) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  playNext: () => Promise<void>;
  playPrevious: () => Promise<void>;
  toggleShuffle: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
}

type PlayerStore = PlayerState & PlayerActions;

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  currentEpisode: null,
  queue: null,
  currentTime: 0,
  duration: 0,
  volume: 1,

  playEpisode: async (episodes: Episode[], episodeId: string, streamUrl: string) => {
    const episode = episodes.find((ep) => ep.id === episodeId);
    if (!episode) {
      throw new Error('Episode not found');
    }

    await playerService.playEpisode(episodes, episodeId, streamUrl);

    set({
      currentEpisode: episode,
      isPlaying: true,
      queue: playerService.getQueue(),
    });
  },

  pause: async () => {
    await playerService.pause();
    set({ isPlaying: false });
  },

  resume: async () => {
    await playerService.resume();
    set({ isPlaying: true });
  },

  seekTo: (time: number) => {
    playerService.seekTo(time);
    set({ currentTime: time });
  },

  setVolume: (volume: number) => {
    playerService.setVolume(volume);
    set({ volume });
  },

  playNext: async () => {
    await playerService.playNext();
    set({
      queue: playerService.getQueue(),
      currentEpisode: playerService.getQueue()?.currentEpisode || null,
    });
  },

  playPrevious: async () => {
    await playerService.playPrevious();
    set({
      queue: playerService.getQueue(),
      currentEpisode: playerService.getQueue()?.currentEpisode || null,
    });
  },

  toggleShuffle: () => {
    playerService.toggleShuffle();
    set({
      queue: playerService.getQueue(),
    });
  },

  setCurrentTime: (time: number) => {
    set({ currentTime: time });
  },

  setDuration: (duration: number) => {
    set({ duration });
  },
}));
