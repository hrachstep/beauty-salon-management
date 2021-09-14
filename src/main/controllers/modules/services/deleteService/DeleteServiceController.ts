import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteServiceUsecase } from '@domain/modules/services/usecases/deleteService';
import { IController } from '@main/interfaces/IController';

export class DeleteServiceController implements IController {
  private readonly usecase: DeleteServiceUsecase;

  constructor() {
    this.usecase = container.resolve(DeleteServiceUsecase);
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await this.usecase.execute(id);

    return response.sendStatus(204);
  }
}
