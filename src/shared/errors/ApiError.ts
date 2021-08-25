export class ApiError extends Error {
  constructor(message: string, private statusCode = 400) {
    super(message);
  }
}
