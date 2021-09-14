import { Request, Response } from 'express';
import { body, ValidationChain } from 'express-validator';
import { container } from 'tsyringe';

import { CreateOrdersPackUseCase } from '@domain/modules/services/usecases/createOrdersPack';
import { IController } from '@main/interfaces/IController';

export class CreateOrdersPackController implements IController {
  private readonly usecase: CreateOrdersPackUseCase;

  constructor() {
    this.usecase = container.resolve(CreateOrdersPackUseCase);
  }

  validate(): ValidationChain[] {
    return [
      body('customer', 'Fill the customer name!').notEmpty(),
      body('price', 'Fill correct price!').isNumeric(),
      body('startDate', 'Fill correct date!').isDate(),
      body('servicesCount', 'Fill the services count!').isArray({ min: 1 }),
      body('servicesCount.*.serviceId', 'Fill a correct serviceId on servicesCount').notEmpty(),
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
