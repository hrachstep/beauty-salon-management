import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteServiceUseCase } from '@domain/modules/services/usecases/deleteService/DeleteServiceUseCase';
import { IController } from '@main/interfaces/IController';

export class DeleteServiceController implements IController {
  private readonly usecase: DeleteServiceUseCase;

  constructor() {
    this.usecase = container.resolve(DeleteServiceUseCase);
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await this.usecase.execute(id);

    return response.sendStatus(204);
  }
}
