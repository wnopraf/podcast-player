import { API_CONFIG } from '@infrastructure/config/api';
import type { PodcastRepository } from '@domain/ports/PodcastRepository';
import type { Podcast } from '@domain/entities/Podcast';
import type { ItunesSearchResponse } from '@infrastructure/dto/ItunesPodcastDto';
import { PodcastMapper } from '@infrastructure/mappers/PodcastMapper';
import { Result } from '@shared/types/Result';
import { NetworkError, ApplicationError } from '@shared/errors/ApplicationError';

export class PodcastApiAdapter implements PodcastRepository {
  async findAll(): Promise<Result<Podcast[], ApplicationError>> {
    try {
      const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.search}?media=podcast&limit=20`;
      const response = await fetch(url);

      if (!response.ok) {
        return Result.error(new NetworkError(`HTTP ${response.status}`));
      }

      const data: ItunesSearchResponse = await response.json();
      return Result.ok(PodcastMapper.toDomainList(data.results));
    } catch (error) {
      return Result.error(
        new ApplicationError('Failed to fetch podcasts', error as Error)
      );
    }
  }

  async findById(id: string): Promise<Result<Podcast | null, ApplicationError>> {
    try {
      const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.podcasts.lookup(id)}`;
      const response = await fetch(url);

      if (!response.ok) {
        return Result.error(new NetworkError(`HTTP ${response.status}`));
      }

      const data: ItunesSearchResponse = await response.json();

      if (data.results.length === 0) {
        return Result.ok(null);
      }

      return Result.ok(PodcastMapper.toDomain(data.results[0]));
    } catch (error) {
      return Result.error(
        new ApplicationError('Failed to fetch podcast', error as Error)
      );
    }
  }
}
