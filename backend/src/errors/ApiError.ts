export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static badRequest(message: string) {
    return new ApiError(message, 400);
  }

  static notFound(message: string) {
    return new ApiError(message, 404);
  }

  static internal(message: string) {
    return new ApiError(message, 500);
  }
}
