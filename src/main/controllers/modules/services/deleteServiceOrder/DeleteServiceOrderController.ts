import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteServiceOrderUseCase } from '@domain/modules/services/usecases/deleteServiceOrder';
import { IController } from '@main/interfaces/IController';

export class DeleteServiceOrderController implements IController {
  private readonly usecase: DeleteServiceOrderUseCase;

  constructor() {
    this.usecase = container.resolve(DeleteServiceOrderUseCase);
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await this.usecase.execute(id);

    return response.sendStatus(204);
  }
}
