import { describe, it, expect, vi } from 'vitest';
import { GetPodcastsUseCase } from '../GetPodcastsUseCase';
import type { PodcastRepository } from '@domain/ports/PodcastRepository';
import { Result } from '@shared/types/Result';
import { ApplicationError } from '@shared/errors/ApplicationError';
import { createMockPodcasts } from '@test/mocks/podcastMocks';

describe('GetPodcastsUseCase', () => {
  it('should execute podcast repository findAll', async () => {
    const mockPodcasts = createMockPodcasts(1);

    const mockRepository: PodcastRepository = {
      findAll: vi.fn().mockResolvedValue(Result.ok(mockPodcasts)),
      findById: vi.fn(),
    };

    const useCase = new GetPodcastsUseCase(mockRepository);
    const result = await useCase.execute();

    expect(mockRepository.findAll).toHaveBeenCalled();
    if (Result.isOk(result)) {
      expect(result.data).toEqual(mockPodcasts);
    }
  });

  it('should return error when repository fails', async () => {
    const mockError = new ApplicationError(
      'Failed to fetch podcasts',
      undefined,
      'REPOSITORY_ERROR'
    );

    const mockRepository: PodcastRepository = {
      findAll: vi.fn().mockResolvedValue(Result.error(mockError)),
      findById: vi.fn(),
    };

    const useCase = new GetPodcastsUseCase(mockRepository);
    const result = await useCase.execute();

    if (Result.isError(result)) {
      expect(result.error).toEqual(mockError);
    }
  });
});
