/**
 * Custom error class carrying an HTTP status code.
 * Thrown from controllers and caught by errorMiddleware.
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Wraps an async route handler so rejected promises are forwarded to next(),
 * instead of needing a try/catch in every controller.
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = { ApiError, asyncHandler };
