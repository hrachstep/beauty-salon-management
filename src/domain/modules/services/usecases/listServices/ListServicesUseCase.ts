import { inject, injectable } from 'tsyringe';

import { Service } from '@domain/modules/services/entities/Service';
import { IServiceRepository } from '@domain/modules/services/interfaces/IServiceRepository';

@injectable()
export class ListServicesUseCase {
  constructor(
    @inject('ServiceRepository')
    private servicesRepository: IServiceRepository,
  ) {}

  async execute(): Promise<Service[]> {
    return this.servicesRepository.findAll();
  }
}
