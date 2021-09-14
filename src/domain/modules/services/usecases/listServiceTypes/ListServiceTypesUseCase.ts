import { inject, injectable } from 'tsyringe';

import { ServiceType } from '@domain/modules/services/entities/ServiceType';
import { IServiceTypeRepository } from '@domain/modules/services/interfaces/IServiceTypeRepository';

@injectable()
export class ListServiceTypesUseCase {
  constructor(
    @inject('ServiceTypeRepository')
    private serviceTypesRepository: IServiceTypeRepository,
  ) {}

  async execute(): Promise<ServiceType[]> {
    return this.serviceTypesRepository.findAll();
  }
}
