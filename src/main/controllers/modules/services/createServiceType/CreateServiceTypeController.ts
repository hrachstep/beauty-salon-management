import { Request, Response } from 'express';
import { body, ValidationChain } from 'express-validator';
import { container } from 'tsyringe';

import { CreateServiceTypeUseCase } from '@domain/modules/services/usecases/createServiceType/CreateServiceTypeUseCase';
import { IController } from '@main/interfaces/IController';

export class CreateServiceTypeController implements IController {
  private readonly usecase: CreateServiceTypeUseCase;

  constructor() {
    this.usecase = container.resolve(CreateServiceTypeUseCase);
  }

  validate(): ValidationChain[] {
    return [
      body('name', 'Fill the service type name!').exists({ checkFalsy: true }),
    ];
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const result = await this.usecase.execute({ name });

    return response.status(201).json(result);
  }
}
