import { Request, Response } from 'express';
import { body, ValidationChain } from 'express-validator';
import { container } from 'tsyringe';

import { AddServiceOrderOnOrdersPackUseCase } from '@domain/modules/services/usecases/addServiceOrderOnOrdersPack';
import { IController } from '@main/interfaces/IController';

export class AddServiceOrderOnOrdersPackController implements IController {
  private readonly usecase: AddServiceOrderOnOrdersPackUseCase;

  constructor() {
    this.usecase = container.resolve(AddServiceOrderOnOrdersPackUseCase);
  }

  validate(): ValidationChain[] {
    return [
      body('date', 'Fill a correct "date" type!').isDate(),
      body('servicesDoneId', 'Fill at least one "serviceDoneId"!').isArray({ min: 1 }),
      body('servicesDoneId.*', 'Fill a correct "id" on "serviceDoneId"!').isString(),
    ];
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      date,
      servicesDoneId,
      image,
    } = request.body;

    const result = await this.usecase.execute(id, {
      date,
      servicesDoneId,
      image,
    });

    return response.status(201).json(result);
  }
}
