import { Request, Response } from 'express';

import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';
import { ServiceTypeRepository } from '@infrastructure/repositories/ServiceTypeRepository';
import { IController } from '@main/interfaces/IController';

export class ListServiceTypesController implements IController {
  private readonly repository: IServiceTypeRepository;

  constructor() {
    this.repository = new ServiceTypeRepository();
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const data = await this.repository.findAll();
    return response.json(data);
  }
}
