import { QueryClient } from '@tanstack/react-query';
import { ApplicationError } from '@shared/errors/ApplicationError';
import toast from 'react-hot-toast';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - podcasts change infrequently
      gcTime: 60 * 60 * 1000, // 1 hour - cache time
      retry: (failureCount, error) => {
        if (error instanceof ApplicationError) {
          if (error.code === 'VALIDATION_ERROR' || error.code === 'NOT_FOUND') {
            return false;
          }
          if (error.code === 'NETWORK_ERROR') {
            return failureCount < 3;
          }
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
    mutations: {
      onError: (error) => {
        if (error instanceof ApplicationError) {
          toast.error(error.message);
        }
      },
    },
  },
});
