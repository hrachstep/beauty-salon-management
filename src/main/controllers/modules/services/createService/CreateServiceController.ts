import { Request, Response } from 'express';
import { body, ValidationChain } from 'express-validator';
import { container } from 'tsyringe';

import { CreateServiceUseCase } from '@domain/modules/services/usecases/createService';
import { IController } from '@main/interfaces/IController';

export class CreateServiceController implements IController {
  private readonly usecase: CreateServiceUseCase;

  constructor() {
    this.usecase = container.resolve(CreateServiceUseCase);
  }

  validate(): ValidationChain[] {
    return [
      body('name', 'Param "name" is missing!').exists({ checkFalsy: true }),
    ];
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const result = await this.usecase.execute({ name });

    return response.status(201).json(result);
  }
}
