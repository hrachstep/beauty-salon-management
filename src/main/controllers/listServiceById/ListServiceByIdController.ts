import { Request, Response } from 'express';
import { param, ValidationChain } from 'express-validator';
import { container } from 'tsyringe';

import { ListServiceByIdUseCase } from '@domain/usecases/listServiceById/ListServiceByIdUseCase';
import { IController } from '@main/interfaces/IController';

export class ListServiceByIdController implements IController {
  private readonly usecase: ListServiceByIdUseCase;

  constructor() {
    this.usecase = container.resolve(ListServiceByIdUseCase);
  }

  validate(): ValidationChain[] {
    return [
      param('id', 'Fill the correct ID!').isString(),
    ];
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const result = await this.usecase.execute(id);

    return response.json(result);
  }
}
