import { Request, Response } from 'express';
import { body, ValidationChain } from 'express-validator';

import { IServiceRepository } from '@domain/interfaces/IServiceRepository';
import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';
import { CreateServiceUseCase } from '@domain/usecases/createService/CreateServiceUseCase';
import { ServiceRepository } from '@infrastructure/repositories/ServiceRepository';
import { ServiceTypeRepository } from '@infrastructure/repositories/ServiceTypeRepository';
import { IController } from '@main/interfaces/IController';

export class CreateServiceController implements IController {
  private serviceTypesRepository: IServiceTypeRepository;
  private servicesRepository: IServiceRepository;
  private readonly usecase: CreateServiceUseCase;

  constructor() {
    this.serviceTypesRepository = new ServiceTypeRepository();
    this.servicesRepository = new ServiceRepository(this.serviceTypesRepository);
    this.usecase = new CreateServiceUseCase(this.serviceTypesRepository, this.servicesRepository);
  }

  validate(): ValidationChain[] {
    return [
      body('customer', 'Fill the customer name!').isString(),
      body('date', 'Fill correct date!').isDate(),
      body('servicesDoneIds', 'Fill at least one service type done!').isArray({ min: 1 }),
      body('price', 'Fill the price\'s service!').isNumeric(),
    ];
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      customer,
      date,
      servicesDoneIds,
      price,
    } = request.body;

    const result = await this.usecase.execute({
      customer,
      date,
      servicesDoneIds,
      price,
    });

    return response.status(201).json(result);
  }
}
