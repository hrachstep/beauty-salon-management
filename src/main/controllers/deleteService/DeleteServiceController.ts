import { Request, Response } from 'express';

import { DeleteServiceUseCase } from '@domain/usecases/deleteService/DeleteServiceUseCase';
import { ServiceRepository } from '@infrastructure/repositories/ServiceRepository';
import { ServiceTypeRepository } from '@infrastructure/repositories/ServiceTypeRepository';
import { IController } from '@main/interfaces/IController';

export class DeleteServiceController implements IController {
  private readonly usecase: DeleteServiceUseCase;

  constructor() {
    const serviceTypesRepository = new ServiceTypeRepository();
    const servicesRepository = new ServiceRepository(serviceTypesRepository);
    this.usecase = new DeleteServiceUseCase(servicesRepository);
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await this.usecase.execute(id);

    return response.sendStatus(204);
  }
}
