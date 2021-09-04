import { Request, Response } from 'express';
import { body, ValidationChain } from 'express-validator';

import { IServiceRepository } from '@domain/interfaces/IServiceRepository';
import { IServicesPackRepository } from '@domain/interfaces/IServicesPackRepository';
import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';
import { AddServiceDoneOnServicesPack } from '@domain/usecases/addServiceDoneOnServicesPack/AddServiceDoneOnServicesPack';
import { ServiceRepository } from '@infrastructure/repositories/ServiceRepository';
import { ServicesPackRepository } from '@infrastructure/repositories/ServicesPackRepository';
import { ServiceTypeRepository } from '@infrastructure/repositories/ServiceTypeRepository';
import { IController } from '@main/interfaces/IController';

export class AddServiceDoneOnServicesPackController implements IController {
  private readonly serviceTypesRepository: IServiceTypeRepository;
  private readonly servicesRepository: IServiceRepository;
  private readonly servicesPackRepository: IServicesPackRepository;
  private readonly usecase: AddServiceDoneOnServicesPack;

  constructor() {
    this.serviceTypesRepository = new ServiceTypeRepository();
    this.servicesRepository = new ServiceRepository(this.serviceTypesRepository);
    this.servicesPackRepository = new ServicesPackRepository(
      this.serviceTypesRepository,
      this.servicesRepository,
    );

    this.usecase = new AddServiceDoneOnServicesPack(
      this.serviceTypesRepository,
      this.servicesRepository,
      this.servicesPackRepository,
    );
  }

  validate(): ValidationChain[] {
    return [
      body('date', 'Fill a correct "date" type!').isDate(),
      body('servicesDoneIds', 'Fill at least one "serviceDoneIds"!').isArray({ min: 1 }),
      body('servicesDoneIds.*', 'Fill a correct "id" on "serviceDoneIds"!').isString(),
    ];
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      date,
      servicesDoneIds,
    } = request.body;

    const result = await this.usecase.execute(id, {
      date,
      servicesDoneIds,
    });

    return response.status(201).json(result);
  }
}
