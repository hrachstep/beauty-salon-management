import { Service } from '@domain/entities/Service';
import { IServiceRepository } from '@domain/interfaces/IServiceRepository';

export type ListServicesUseCaseProps = {
  month?: Date;
}

export class ListServicesUseCase {
  constructor(private servicesRepository: IServiceRepository) {}

  async execute({ month }: ListServicesUseCaseProps): Promise<Service[]> {
    if (month) {
      return this.servicesRepository.findByMonth(month);
    }

    return this.servicesRepository.findAll();
  }
}
