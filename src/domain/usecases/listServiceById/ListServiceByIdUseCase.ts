import { Service } from '@domain/entities/Service';
import { IServiceRepository } from '@domain/interfaces/IServiceRepository';
import { ApiError } from '@shared/errors/ApiError';

export class ListServiceByIdUseCase {
  constructor(private servicesRepository: IServiceRepository) {}

  async execute(id: string): Promise<Service> {
    if (!id) return null;

    const service = await this.servicesRepository.findById(id);

    if (!service) {
      throw new ApiError(`Service with id ${id} don't exists!`, 404);
    }

    return service;
  }
}
