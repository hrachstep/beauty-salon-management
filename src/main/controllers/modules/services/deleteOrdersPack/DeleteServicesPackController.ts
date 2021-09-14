import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteOrdersPackUseCase } from '@domain/modules/services/usecases/deleteOrdersPack';
import { IController } from '@main/interfaces/IController';

export class DeleteOrdersPackController implements IController {
  private readonly usecase: DeleteOrdersPackUseCase;

  constructor() {
    this.usecase = container.resolve(DeleteOrdersPackUseCase);
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await this.usecase.execute(id);

    return response.sendStatus(204);
  }
}
