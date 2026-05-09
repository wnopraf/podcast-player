import type { Podcast } from '@domain/entities/Podcast';
import type { PodcastRepository } from '@domain/ports/PodcastRepository';
import type { Result } from '@shared/types/Result';
import type { ApplicationError } from '@shared/errors/ApplicationError';

export class GetPodcastUseCase {
  private podcastRepository: PodcastRepository;

  constructor(podcastRepository: PodcastRepository) {
    this.podcastRepository = podcastRepository;
  }

  async execute(id: string): Promise<Result<Podcast | null, ApplicationError>> {
    return await this.podcastRepository.findById(id);
  }
}
