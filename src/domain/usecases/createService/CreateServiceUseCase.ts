import { v4 as uuidV4 } from 'uuid';

import { Service } from '@domain/entities/Service';
import { IServiceRepository } from '@domain/interfaces/IServiceRepository';
import { ApiError } from '@shared/errors/ApiError';

export class CreateServiceUseCase {
  constructor(private servicesRepository: IServiceRepository) {}

  async execute({
    customer,
    date,
    servicesDoneIds,
    isFromPack = false,
  }: Service): Promise<Service> {
    const id = uuidV4();

    if (!servicesDoneIds?.length) throw new ApiError('You must send the Services Done Ids!');

    const service = await this.servicesRepository.create({
      id,
      customer,
      date,
      servicesDoneIds,
      isFromPack,
    });

    return service;
  }
}
