import type { ApplicationError } from '../errors/ApplicationError.ts';

export type Result<T, E = ApplicationError> =
  | { success: true; data: T }
  | { success: false; error: E };

export const Result = {
  ok: <T>(data: T): Result<T> => ({ success: true, data }),
  error: <E = ApplicationError>(error: E): Result<never, E> => ({
    success: false,
    error,
  }),
  isOk: <T, E>(result: Result<T, E>): result is { success: true; data: T } =>
    result.success === true,
  isError: <T, E>(result: Result<T, E>): result is { success: false; error: E } =>
    result.success === false,
};
