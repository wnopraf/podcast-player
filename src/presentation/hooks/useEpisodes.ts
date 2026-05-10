import { useQuery } from '@tanstack/react-query';
import { diContainer } from '@infrastructure/di/container';
import type { GetEpisodesUseCase } from '@application/use-cases/GetEpisodesUseCase';
import { Result } from '@shared/types/Result';
import { ApplicationError } from '@shared/errors/ApplicationError';

const getEpisodesUseCase = diContainer.resolve<GetEpisodesUseCase>('getEpisodesUseCase');

export const useEpisodes = (collectionId: string) => {
  return useQuery({
    queryKey: ['episodes', collectionId],
    queryFn: async () => {
      const result = await getEpisodesUseCase.execute(collectionId);
      if (Result.isError(result)) {
        throw result.error;
      }
      return result.data;
    },
    enabled: !!collectionId,
    throwOnError: (error) => {
      if (error instanceof ApplicationError) {
        return error.code === 'NETWORK_ERROR';
      }
      return true;
    },
  });
};

export type UseEpisodesReturn = ReturnType<typeof useEpisodes>;
