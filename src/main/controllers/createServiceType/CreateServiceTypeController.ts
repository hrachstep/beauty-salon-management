import { Request, Response } from 'express';
import { body, ValidationChain, validationResult } from 'express-validator';

import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';
import { CreateServiceTypeUseCase } from '@domain/usecases/createServiceType/CreateServiceTypeUseCase';
import { ServiceTypeRepository } from '@infrastructure/repositories/ServiceTypeRepository';
import { IController } from '@main/interfaces/IController';
import { ApiError } from '@shared/errors/ApiError';

export class CreateServiceTypeController implements IController {
  private readonly repository: IServiceTypeRepository;

  constructor() {
    this.repository = new ServiceTypeRepository();
  }

  validate(): ValidationChain[] {
    return [
      body('name', 'Fill the service type name!').exists({ checkFalsy: true }),
    ];
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const usecase = new CreateServiceTypeUseCase(this.repository);
    const result = await usecase.execute({ name });

    return response.status(201).json(result);
  }
}
