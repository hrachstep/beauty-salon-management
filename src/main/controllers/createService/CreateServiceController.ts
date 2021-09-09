import { Request, Response } from 'express';
import { body, ValidationChain } from 'express-validator';
import { container } from 'tsyringe';

import { CreateServiceUseCase } from '@domain/usecases/createService/CreateServiceUseCase';
import { IController } from '@main/interfaces/IController';

export class CreateServiceController implements IController {
  private readonly usecase: CreateServiceUseCase;

  constructor() {
    this.usecase = container.resolve(CreateServiceUseCase);
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
      image,
    } = request.body;

    const result = await this.usecase.execute({
      customer,
      date,
      servicesDoneIds,
      price,
      image,
    });

    return response.status(201).json(result);
  }
}
