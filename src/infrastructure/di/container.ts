import { createContainer, asClass } from 'awilix';
import { PlayerService } from '@domain/services/PlayerService';
import { AudioPlayerAdapter } from '@infrastructure/adapters/AudioPlayerAdapter';
import { EpisodeQueueService } from '@domain/services/EpisodeQueueService';
import { GetPodcastsUseCase } from '@application/use-cases/GetPodcastsUseCase';
import { GetPodcastUseCase } from '@application/use-cases/GetPodcastUseCase';
import { SearchPodcastsUseCase } from '@application/use-cases/SearchPodcastsUseCase';
import { OrderPodcastsUseCase } from '@application/use-cases/OrderPodcastsUseCase';
import { PodcastApiAdapter } from '@infrastructure/adapters/api/PodcastApiAdapter';
import { GetEpisodesUseCase } from '@application/use-cases/GetEpisodesUseCase';
import { EpisodeApiAdapter } from '@infrastructure/adapters/api/EpisodeApiAdapter';

export const diContainer = createContainer();

// Domain services
diContainer.register({
  audioPlayerAdapter: asClass(AudioPlayerAdapter).singleton(),
  episodeQueueService: asClass(EpisodeQueueService).singleton(),
  playerService: asClass(PlayerService).singleton(),
});

// Repositories
diContainer.register({
  podcastRepository: asClass(PodcastApiAdapter).singleton(),
  episodeRepository: asClass(EpisodeApiAdapter).singleton(),
});

// Use cases
diContainer.register({
  getPodcastsUseCase: asClass(GetPodcastsUseCase).singleton(),
  getPodcastUseCase: asClass(GetPodcastUseCase).singleton(),
  searchPodcastsUseCase: asClass(SearchPodcastsUseCase).singleton(),
  orderPodcastsUseCase: asClass(OrderPodcastsUseCase).singleton(),
  getEpisodesUseCase: asClass(GetEpisodesUseCase).singleton(),
});
