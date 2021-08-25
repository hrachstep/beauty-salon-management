import { v4 as uuidV4 } from 'uuid';

import { Service } from '../../entities/Service';
import { IServiceRepository } from '../../interfaces/IServiceRepository';

export class CreateServiceUseCase {
  constructor(private servicesRepository: IServiceRepository) {}

  async execute({
    customer,
    date,
    servicesDone,
  }: Service): Promise<Service> {
    const id = uuidV4();

    const service = await this.servicesRepository.create({
      id,
      customer,
      date,
      servicesDone,
    });

    return service;
  }
}
