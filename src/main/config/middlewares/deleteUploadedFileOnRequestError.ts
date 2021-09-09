import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

export const deleteUploadedFileOnRequestError = async (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  if (error && request.file) {
    try {
      fs.unlinkSync(request.file.path);
    } catch {
      //
    }
  }

  next(error);
};
