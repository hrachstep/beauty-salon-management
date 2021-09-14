import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { Service } from '@domain/modules/services/entities/Service';
import { IServiceRepository } from '@domain/modules/services/interfaces/IServiceRepository';
import { ApiError } from '@shared/errors/ApiError';

@injectable()
export class CreateServiceUseCase {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,
  ) {}

  async execute({ name }: Service): Promise<Service> {
    const serviceAlreadyExists = await this.serviceRepository.findByName(name);

    if (serviceAlreadyExists) throw new ApiError('Service\'s name already exists!');

    const service = await this.serviceRepository.create({
      id: uuidV4(),
      name,
    });

    return service;
  }
}
