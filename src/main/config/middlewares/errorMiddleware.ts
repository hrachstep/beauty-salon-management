import { NextFunction, Request, Response } from 'express';

import { ApiError } from '@shared/errors/ApiError';

const errorMiddleware = async (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response> => {
  if (error instanceof ApiError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal Server Error - ${error.message}`,
  });
};

export { errorMiddleware };
