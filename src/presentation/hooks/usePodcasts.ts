import { useQuery } from '@tanstack/react-query';
import { diContainer } from '@infrastructure/di/container';
import type { GetPodcastsUseCase } from '@application/use-cases/GetPodcastsUseCase';
import { Result } from '@shared/types/Result';

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
  });
};

export type UsePodcastsReturn = ReturnType<typeof usePodcasts>;
