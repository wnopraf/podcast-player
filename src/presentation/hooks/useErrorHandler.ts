import { ApplicationError } from '@shared/errors/ApplicationError';
import toast from 'react-hot-toast';

export const useErrorHandler = () => {
  const handleError = (error: ApplicationError) => {
    const message = getErrorMessage(error);
    toast.error(message);
  };

  return { handleError };
};

function getErrorMessage(error: ApplicationError): string {
  switch (error.code) {
    case 'NETWORK_ERROR':
      return 'Error de conexión. Verifica tu internet.';
    case 'NOT_FOUND':
      return 'El recurso no fue encontrado.';
    case 'VALIDATION_ERROR':
      return error.message;
    default:
      return 'Algo salió mal. Intenta nuevamente.';
  }
}
