import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { VerifyAuthTokenUseCase } from '@domain/modules/users/usecases/verifyAuthToken/VerifyAuthTokenUseCase';
import { ApiError } from '@shared/errors/ApiError';

export const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const {
    authorization: token,
    signinmethod: signInMethod,
    providerid: providerId,
  } = request.headers;

  if (!token || !signInMethod || !providerId) {
    throw new ApiError('One of these params "authorization", "signInMethod" or "providerId" is missing on request headers!', 401);
  }

  const verifyTokenUsecase = container.resolve(VerifyAuthTokenUseCase);

  await verifyTokenUsecase.execute({
    token,
    providerId: `${providerId}`,
    signInMethod: `${signInMethod}`,
  });

  next();
};
