import { Request, Response } from 'express';
import { ValidationChain } from 'express-validator';
import { container } from 'tsyringe';

import { ListServicesUseCase } from '@domain/modules/services/usecases/listServices';
import { IController } from '@main/interfaces/IController';
import { paginationQuery } from '@main/shared/validation/paginationQuery';

export class ListServicesController implements IController {
  private readonly usecase: ListServicesUseCase;

  constructor() {
    this.usecase = container.resolve(ListServicesUseCase);
  }

  validate(): ValidationChain[] {
    return paginationQuery;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { page, limit } = request.query;

    const data = await this.usecase.execute({
      page: Number(page) || undefined,
      limit: Number(limit) || undefined,
    });

    return response.json(data);
  }
}
