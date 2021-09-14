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
      body('servicesDoneIds', 'Fill at least one "serviceDoneIds"!').isArray({ min: 1 }),
      body('servicesDoneIds.*', 'Fill a correct "id" on "serviceDoneIds"!').isString(),
    ];
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      date,
      servicesDoneIds,
      image,
    } = request.body;

    const result = await this.usecase.execute(id, {
      date,
      servicesDoneIds,
      image,
    });

    return response.status(201).json(result);
  }
}
