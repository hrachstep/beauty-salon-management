import { Request, Response } from 'express';
import { param, ValidationChain } from 'express-validator';

import { IServiceRepository } from '@domain/interfaces/IServiceRepository';
import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';
import { ListServiceByIdUseCase } from '@domain/usecases/listServiceById/ListServiceByIdUseCase';
import { ServiceRepository } from '@infrastructure/repositories/ServiceRepository';
import { ServiceTypeRepository } from '@infrastructure/repositories/ServiceTypeRepository';
import { IController } from '@main/interfaces/IController';

export class ListServiceByIdController implements IController {
  private readonly servicesRepository: IServiceRepository;
  private readonly serviceTypesRepository: IServiceTypeRepository;
  private readonly usecase: ListServiceByIdUseCase;

  constructor() {
    this.serviceTypesRepository = new ServiceTypeRepository();
    this.servicesRepository = new ServiceRepository(this.serviceTypesRepository);
    this.usecase = new ListServiceByIdUseCase(this.servicesRepository);
  }

  validate(): ValidationChain[] {
    return [
      param('id', 'Fill the correct ID!').isString(),
    ];
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const result = await this.usecase.execute(id);

    return response.json(result);
  }
}
