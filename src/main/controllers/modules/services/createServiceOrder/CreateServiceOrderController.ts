import { Request, Response } from 'express';
import { body, ValidationChain } from 'express-validator';
import { container } from 'tsyringe';

import { CreateServiceOrderUseCase } from '@domain/modules/services/usecases/createServiceOrder';
import { IController } from '@main/interfaces/IController';

export class CreateServiceOrderController implements IController {
  private readonly usecase: CreateServiceOrderUseCase;

  constructor() {
    this.usecase = container.resolve(CreateServiceOrderUseCase);
  }

  validate(): ValidationChain[] {
    return [
      body('customer', 'Fill the customer name!').isString(),
      body('date', 'Fill correct date!').isDate(),
      body('servicesDoneId', 'Fill at least one service type done!').isArray({ min: 1 }),
      body('price', 'Fill the price\'s service!').isNumeric(),
    ];
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      customer,
      date,
      servicesDoneId,
      price,
      image,
    } = request.body;

    const result = await this.usecase.execute({
      customer,
      date,
      servicesDoneId,
      price,
      image,
    });

    return response.status(201).json(result);
  }
}
