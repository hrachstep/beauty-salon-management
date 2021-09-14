import { inject, injectable } from 'tsyringe';

import { ServicesPack } from '@domain/modules/services/entities/ServicesPack';
import { IServicesPackRepository } from '@domain/modules/services/interfaces/IServicesPackRepository';

export type ListServicesPacksUsecaseProps = {
  month?: Date;
}

@injectable()
export class ListServicesPacksUseCase {
  constructor(
    @inject('ServicesPackRepository')
    private readonly servicesPacksRepository: IServicesPackRepository,
  ) {}

  execute({ month }: ListServicesPacksUsecaseProps): Promise<ServicesPack[]> {
    if (month) {
      return this.servicesPacksRepository.findByMonth(month);
    }

    return this.servicesPacksRepository.findAll();
  }
}
