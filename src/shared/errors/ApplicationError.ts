export class ApplicationError extends Error {
  readonly cause?: Error;
  readonly code?: string;

  constructor(message: string, cause?: Error, code?: string) {
    super(message);
    this.name = 'ApplicationError';
    this.cause = cause;
    this.code = code;
  }
}

export class NetworkError extends ApplicationError {
  constructor(message: string, cause?: Error) {
    super(message, cause, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string, cause?: Error) {
    super(message, cause, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message: string, cause?: Error) {
    super(message, cause, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}
