import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteServiceTypeUsecase } from '@domain/usecases/deleteServiceType/DeleteServiceTypeUseCase';
import { IController } from '@main/interfaces/IController';

export class DeleteServiceTypeController implements IController {
  private readonly usecase: DeleteServiceTypeUsecase;

  constructor() {
    this.usecase = container.resolve(DeleteServiceTypeUsecase);
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await this.usecase.execute(id);

    return response.sendStatus(204);
  }
}
