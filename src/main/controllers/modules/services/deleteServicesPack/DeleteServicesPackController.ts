import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteServicesPackUseCase } from '@domain/modules/services/usecases/deleteServicesPack/DeleteServicesPackUseCase';
import { IController } from '@main/interfaces/IController';

export class DeleteServicesPackController implements IController {
  private readonly usecase: DeleteServicesPackUseCase;

  constructor() {
    this.usecase = container.resolve(DeleteServicesPackUseCase);
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await this.usecase.execute(id);

    return response.sendStatus(204);
  }
}
