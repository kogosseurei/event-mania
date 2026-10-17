export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}
export class ValidationError extends AppError {
  constructor(message: string) {
    super('VALIDATION_ERROR', message, 400);
  }
}
export class NotFoundError extends AppError {
  constructor(message: string) {
    super('NOT_FOUND', message, 404);
  }
}
export class RateLimitError extends AppError {
  constructor() {
    super('RATE_LIMITED', 'Too many requests. Please try again shortly.', 429);
  }
}
export class UpstreamError extends AppError {
  constructor(message: string) {
    super('UPSTREAM_ERROR', message, 502);
  }
}
