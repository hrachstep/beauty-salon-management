import { inject, injectable } from 'tsyringe';

import { Service } from '@domain/modules/services/entities/Service';
import { IServiceRepository } from '@domain/modules/services/interfaces/IServiceRepository';
import { ApiError } from '@shared/errors/ApiError';

@injectable()
export class ListServiceByIdUseCase {
  constructor(
    @inject('ServiceRepository')
    private servicesRepository: IServiceRepository,
  ) {}

  async execute(id: string): Promise<Service> {
    if (!id) return null;

    const service = await this.servicesRepository.findById(id);

    if (!service) {
      throw new ApiError(`Service with id ${id} don't exists!`, 404);
    }

    return service;
  }
}
