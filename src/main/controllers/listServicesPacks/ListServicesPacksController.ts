import { Request, Response } from 'express';
import { query, ValidationChain } from 'express-validator';
import { container } from 'tsyringe';

import { ListServicesPacksUseCase } from '@domain/usecases/listServicesPacks/ListServicesPacksUseCase';
import { IController } from '@main/interfaces/IController';

export class ListServicesPacksController implements IController {
  private readonly usecase: ListServicesPacksUseCase;

  constructor() {
    this.usecase = container.resolve(ListServicesPacksUseCase);
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
