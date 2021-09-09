import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { container } from 'tsyringe';

import { UploadImageUseCase } from '@domain/usecases/uploadImage/UploadImageUseCase';

export class UploadImageController {
  private readonly usecase: UploadImageUseCase;

  constructor() {
    this.usecase = container.resolve(UploadImageUseCase);
  }

  async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
    const image = request.file;

    if (!image) return next();

    const fileName = `${image.destination}/${image.filename}`;
    const uploadedFileName = await this.usecase.execute(fileName, 'nails');
    request.body.image = uploadedFileName;

    fs.unlinkSync(fileName);
    return next();
  }
}
