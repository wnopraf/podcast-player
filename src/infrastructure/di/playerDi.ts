import { PlayerService } from '@domain/services/PlayerService';
import { AudioPlayerAdapter } from '@infrastructure/adapters/AudioPlayerAdapter';
import { EpisodeQueueService } from '@domain/services/EpisodeQueueService';

export const createPlayerService = (): PlayerService => {
  const audioPlayer = new AudioPlayerAdapter();
  const queueService = new EpisodeQueueService();
  return new PlayerService(audioPlayer, queueService);
};
