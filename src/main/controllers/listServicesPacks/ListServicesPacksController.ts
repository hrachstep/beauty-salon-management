import { Request, Response } from 'express';
import { query, ValidationChain } from 'express-validator';

import { ListServicesPacksUseCase } from '@domain/usecases/listServicesPacks/ListServicesPacksUseCase';
import { ServiceRepository } from '@infrastructure/repositories/ServiceRepository';
import { ServicesPackRepository } from '@infrastructure/repositories/ServicesPackRepository';
import { ServiceTypeRepository } from '@infrastructure/repositories/ServiceTypeRepository';
import { IController } from '@main/interfaces/IController';

export class ListServicesPacksController implements IController {
  private readonly serviceTypesRepository = new ServiceTypeRepository();
  private readonly servicesRepository = new ServiceRepository(this.serviceTypesRepository);
  private readonly servicesPackRepository = new ServicesPackRepository(
    this.serviceTypesRepository,
    this.servicesRepository,
  );

  private readonly usecase: ListServicesPacksUseCase;

  constructor() {
    this.usecase = new ListServicesPacksUseCase(this.servicesPackRepository);
  }

  validate(): ValidationChain[] {
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
