import { inject, injectable } from 'tsyringe';

import { ServiceType } from '@domain/entities/ServiceType';
import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';

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
