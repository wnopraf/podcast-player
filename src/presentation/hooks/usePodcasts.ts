import { useQuery } from '@tanstack/react-query';
import { diContainer } from '@infrastructure/di/container';
import type { GetPodcastsUseCase } from '@application/use-cases/GetPodcastsUseCase';
import { Result } from '@shared/types/Result';
import { ApplicationError } from '@shared/errors/ApplicationError';

const getPodcastsUseCase = diContainer.resolve<GetPodcastsUseCase>('getPodcastsUseCase');

export const usePodcasts = () => {
  return useQuery({
    queryKey: ['podcasts'],
    queryFn: async () => {
      const result = await getPodcastsUseCase.execute();
      if (Result.isError(result)) {
        throw result.error;
      }
      return result.data;
    },
    throwOnError: (error) => {
      if (error instanceof ApplicationError) {
        return error.code === 'NETWORK_ERROR';
      }
      return true;
    },
  });
};

export type UsePodcastsReturn = ReturnType<typeof usePodcasts>;
