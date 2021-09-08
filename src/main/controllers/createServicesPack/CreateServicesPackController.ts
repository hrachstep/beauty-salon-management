import { Request, Response } from 'express';
import { body, ValidationChain } from 'express-validator';
import { container } from 'tsyringe';

import { CreateServicesPackUseCase } from '@domain/usecases/createServicesPack/CreateServicesPackUseCase';
import { IController } from '@main/interfaces/IController';

export class CreateServicesPackController implements IController {
  private readonly usecase: CreateServicesPackUseCase;

  constructor() {
    this.usecase = container.resolve(CreateServicesPackUseCase);
  }

  validate(): ValidationChain[] {
    return [
      body('customer', 'Fill the customer name!').notEmpty(),
      body('price', 'Fill correct price!').isNumeric(),
      body('startDate', 'Fill correct date!').isDate(),
      body('servicesCount', 'Fill the services count!').isArray({ min: 1 }),
      body('servicesCount.*.serviceTypeId', 'Fill a correct serviceTypeId on servicesCount').notEmpty(),
      body('servicesCount.*.quantity', 'Fill a correct quantity on servicesCount').isInt({ min: 1 }),
    ];
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      customer,
      price,
      servicesCount,
      startDate,
    } = request.body;

    const result = await this.usecase.execute({
      customer,
      price,
      servicesCount,
      startDate,
    });

    return response.status(201).json(result);
  }
}
