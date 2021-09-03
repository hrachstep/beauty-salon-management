import { Request, Response } from 'express';
import { query, ValidationChain } from 'express-validator';

import { IServiceRepository } from '@domain/interfaces/IServiceRepository';
import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';
import { ListServicesUseCase } from '@domain/usecases/listServices/ListServicesUseCase';
import { ServiceRepository } from '@infrastructure/repositories/ServiceRepository';
import { ServiceTypeRepository } from '@infrastructure/repositories/ServiceTypeRepository';
import { IController } from '@main/interfaces/IController';

export class ListServicesController implements IController {
  private readonly servicesRepository: IServiceRepository;
  private readonly serviceTypesRepository: IServiceTypeRepository;
  private readonly usecase: ListServicesUseCase;

  constructor() {
    this.serviceTypesRepository = new ServiceTypeRepository();
    this.servicesRepository = new ServiceRepository(this.serviceTypesRepository);
    this.usecase = new ListServicesUseCase(this.servicesRepository);
  }

  validation(): ValidationChain[] {
    return [
      query('month', 'Fill a correct month').optional().isDate(),
    ];
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { month } = request.query;
    const date = month ? new Date(month.toString()) : null;

    const result = await this.usecase.execute({ month: date });
    return response.json(result);
  }
}
