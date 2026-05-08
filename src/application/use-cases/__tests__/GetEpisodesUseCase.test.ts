import { describe, it, expect, vi } from 'vitest';
import { GetEpisodesUseCase } from '../GetEpisodesUseCase';
import type { EpisodeRepository } from '@domain/ports/EpisodeRepository';
import { Result } from '@shared/types/Result';
import { ApplicationError } from '@shared/errors/ApplicationError';
import { createMockEpisodes } from '@test/mocks/episodeMocks';

describe('GetEpisodesUseCase', () => {
  it('should execute episode repository findByCollectionId', async () => {
    const mockEpisodes = createMockEpisodes(1);

    const mockRepository: EpisodeRepository = {
      findByCollectionId: vi.fn().mockResolvedValue(Result.ok(mockEpisodes)),
    };

    const useCase = new GetEpisodesUseCase(mockRepository);
    const result = await useCase.execute('100');

    expect(mockRepository.findByCollectionId).toHaveBeenCalledWith('100');
    if (Result.isOk(result)) {
      expect(result.data).toEqual(mockEpisodes);
    }
  });

  it('should return error when repository fails', async () => {
    const mockError = new ApplicationError(
      'Failed to fetch episodes',
      undefined,
      'REPOSITORY_ERROR'
    );

    const mockRepository: EpisodeRepository = {
      findByCollectionId: vi.fn().mockResolvedValue(Result.error(mockError)),
    };

    const useCase = new GetEpisodesUseCase(mockRepository);
    const result = await useCase.execute('100');

    if (Result.isError(result)) {
      expect(result.error).toEqual(mockError);
    }
  });
});
