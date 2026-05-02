import type { Episode } from '@domain/entities/Episode';
import type { EpisodeRepository } from '@domain/ports/EpisodeRepository';
import type { Result } from '@shared/types/Result';
import type { ApplicationError } from '@shared/errors/ApplicationError';

export class GetEpisodesUseCase {
  private episodeRepository: EpisodeRepository;

  constructor(episodeRepository: EpisodeRepository) {
    this.episodeRepository = episodeRepository;
  }

  async execute(collectionId: string): Promise<Result<Episode[], ApplicationError>> {
    return await this.episodeRepository.findByCollectionId(collectionId);
  }
}
