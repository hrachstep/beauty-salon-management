import { v4 as uuidV4 } from 'uuid';

import { ServiceType } from '@domain/entities/ServiceType';
import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';

import { ApiError } from '../../../shared/errors/ApiError';

export class CreateServiceTypeUseCase {
  constructor(private serviceTypeRepository: IServiceTypeRepository) {}

  async execute({ name }: ServiceType): Promise<ServiceType> {
    const serviceTypeAlreadyExists = await this.serviceTypeRepository.findByName(name);

    if (serviceTypeAlreadyExists) throw new ApiError('Service Type already exists!');

    const serviceType = await this.serviceTypeRepository.create({
      id: uuidV4(),
      name,
    });

    return serviceType;
  }
}
