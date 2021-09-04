import { ServicesPack } from '@domain/entities/ServicesPack';
import { IServicesPackRepository } from '@domain/interfaces/IServicesPackRepository';

export type ListServicesPacksUsecaseProps = {
  month?: Date;
}

export class ListServicesPacksUseCase {
  constructor(private readonly servicesPacksRepository: IServicesPackRepository) {}

  execute({ month }: ListServicesPacksUsecaseProps): Promise<ServicesPack[]> {
    if (month) {
      return this.servicesPacksRepository.findByMonth(month);
    }

    return this.servicesPacksRepository.findAll();
  }
}
