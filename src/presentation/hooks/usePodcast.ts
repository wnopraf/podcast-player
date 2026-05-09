import { useQuery } from '@tanstack/react-query';
import { diContainer } from '@infrastructure/di/container';
import type { GetPodcastUseCase } from '@application/use-cases/GetPodcastUseCase';
import { Result } from '@shared/types/Result';

const getPodcastUseCase = diContainer.resolve<GetPodcastUseCase>('getPodcastUseCase');

export const usePodcast = (id: string) => {
  return useQuery({
    queryKey: ['podcast', id],
    queryFn: async () => {
      const result = await getPodcastUseCase.execute(id);
      if (Result.isError(result)) {
        throw result.error;
      }
      return result.data;
    },
    enabled: !!id,
  });
};

export type UsePodcastReturn = ReturnType<typeof usePodcast>;
