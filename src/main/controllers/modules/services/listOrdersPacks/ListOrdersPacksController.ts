import { Request, Response } from 'express';
import { query, ValidationChain } from 'express-validator';
import { container } from 'tsyringe';

import { ListOrdersPacksUseCase } from '@domain/modules/services/usecases/listOrdersPacks';
import { IController } from '@main/interfaces/IController';
import { paginationQuery } from '@main/shared/validation/paginationQuery';

export class ListOrdersPacksController implements IController {
  private readonly usecase: ListOrdersPacksUseCase;

  constructor() {
    this.usecase = container.resolve(ListOrdersPacksUseCase);
  }

  validate(): ValidationChain[] {
    return [
      query('month', 'Fill a correct month').optional().isDate(),
      ...paginationQuery,
    ];
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { month, page, limit } = request.query;
    const date = month ? new Date(month.toString()) : null;

    const result = await this.usecase.execute({
      month: date,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    return response.json(result);
  }
}
