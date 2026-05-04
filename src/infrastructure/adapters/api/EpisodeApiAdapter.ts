import { API_CONFIG } from '@infrastructure/config/api';
import type { EpisodeRepository } from '@domain/ports/EpisodeRepository';
import type { Episode } from '@domain/entities/Episode';
import type { ItunesEpisodesResponse } from '@infrastructure/dto/ItunesEpisodeDto';
import { EpisodeMapper } from '@infrastructure/mappers/EpisodeMapper';
import { Result } from '@shared/types/Result';
import { NetworkError, ApplicationError } from '@shared/errors/ApplicationError';

export class EpisodeApiAdapter implements EpisodeRepository {
  async findByCollectionId(collectionId: string): Promise<Result<Episode[], ApplicationError>> {
    try {
      const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.episodes.lookup(collectionId)}`;
      const response = await fetch(url);

      if (!response.ok) {
        return Result.error(new NetworkError(`HTTP ${response.status}`));
      }

      const data: ItunesEpisodesResponse = await response.json();
      return Result.ok(EpisodeMapper.toDomainList(data.results));
    } catch (error) {
      return Result.error(new ApplicationError('Failed to fetch episodes', error as Error));
    }
  }
}
