import { inject, injectable } from 'tsyringe';

import { Service } from '@domain/modules/services/entities/Service';
import { IServiceRepository } from '@domain/modules/services/interfaces/IServiceRepository';

export type ListServicesUseCaseProps = {
  month?: Date;
}

@injectable()
export class ListServicesUseCase {
  constructor(
    @inject('ServiceRepository')
    private servicesRepository: IServiceRepository,
  ) {}

  async execute({ month }: ListServicesUseCaseProps): Promise<Service[]> {
    if (month) {
      return this.servicesRepository.findByMonth(month);
    }

    return this.servicesRepository.findAll();
  }
}
