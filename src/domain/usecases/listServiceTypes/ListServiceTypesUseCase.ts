import { ServiceType } from '@domain/entities/ServiceType';
import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';

export class ListServiceTypesUseCase {
  constructor(private serviceTypesRepository: IServiceTypeRepository) {}

  async execute(): Promise<ServiceType[]> {
    return this.serviceTypesRepository.findAll();
  }
}
