import { Request, Response } from 'express';
import { param, ValidationChain } from 'express-validator';
import { container } from 'tsyringe';

import { ListServiceOrderByIdUseCase } from '@domain/modules/services/usecases/listServiceOrderById';
import { IController } from '@main/interfaces/IController';

export class ListServiceByIdController implements IController {
  private readonly usecase: ListServiceOrderByIdUseCase;

  constructor() {
    this.usecase = container.resolve(ListServiceOrderByIdUseCase);
  }

  validate(): ValidationChain[] {
    return [
      param('id', 'Param "id" is missing!').isString(),
    ];
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const result = await this.usecase.execute(id);

    return response.json(result);
  }
}
