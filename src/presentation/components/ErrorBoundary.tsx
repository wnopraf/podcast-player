import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { ApplicationError } from '@shared/errors/ApplicationError';
import { queryClient } from '@infrastructure/config/queryClient';

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  const isAppError = error instanceof ApplicationError;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md text-center">
        <div className="mb-4 text-6xl">😢</div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          {isAppError ? error.message : 'Algo salió mal'}
        </h2>
        <p className="mb-6 text-gray-600">
          {isAppError && error.code === 'NETWORK_ERROR'
            ? 'Error de conexión. Verifica tu internet.'
            : 'Intenta recargar la página.'}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}

export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        queryClient.clear();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};
