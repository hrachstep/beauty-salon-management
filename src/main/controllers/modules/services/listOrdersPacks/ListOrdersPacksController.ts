import { Request, Response } from 'express';
import { query, ValidationChain } from 'express-validator';
import { container } from 'tsyringe';

import { ListOrdersPacksUseCase } from '@domain/modules/services/usecases/listOrdersPacks';
import { IController } from '@main/interfaces/IController';

export class ListOrdersPacksController implements IController {
  private readonly usecase: ListOrdersPacksUseCase;

  constructor() {
    this.usecase = container.resolve(ListOrdersPacksUseCase);
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
