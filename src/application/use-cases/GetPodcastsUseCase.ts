import type { Podcast } from '../../domain/entities/Podcast';
import type { PodcastRepository } from '../../domain/ports/PodcastRepository';
import type { Result } from '../../shared/types/Result';
import type { ApplicationError } from '../../shared/errors/ApplicationError';

export class GetPodcastsUseCase {
  private podcastRepository: PodcastRepository;

  constructor(podcastRepository: PodcastRepository) {
    this.podcastRepository = podcastRepository;
  }

  async execute(): Promise<Result<Podcast[], ApplicationError>> {
    return await this.podcastRepository.findAll();
  }
}
