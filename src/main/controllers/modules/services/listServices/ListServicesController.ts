import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListServicesUseCase } from '@domain/modules/services/usecases/listServices';
import { IController } from '@main/interfaces/IController';

export class ListServicesController implements IController {
  private readonly usecase: ListServicesUseCase;

  constructor() {
    this.usecase = container.resolve(ListServicesUseCase);
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const data = await this.usecase.execute();

    return response.json(data);
  }
}
