import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { ApiError } from '@shared/errors/ApiError';

const checkErrorMiddleware = (request: Request, response: Response, next: NextFunction): void => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((el) => el.msg
        ?? `Param missing: ${el.param}`).join('\n');

    throw new ApiError(errorMessage);
  }

  next();
};

export { checkErrorMiddleware };
