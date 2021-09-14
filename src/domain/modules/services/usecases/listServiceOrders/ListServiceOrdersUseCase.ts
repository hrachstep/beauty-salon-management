import { inject, injectable } from 'tsyringe';

import { ServiceOrder } from '@domain/modules/services/entities/ServiceOrder';
import { IServiceOrderRepository } from '@domain/modules/services/interfaces/IServiceOrderRepository';

export type ListServiceOrdersUseCaseProps = {
  month?: Date;
}

@injectable()
export class ListServiceOrdersUseCase {
  constructor(
    @inject('ServiceOrderRepository')
    private serviceOrdersRepository: IServiceOrderRepository,
  ) {}

  async execute({ month }: ListServiceOrdersUseCaseProps): Promise<ServiceOrder[]> {
    if (month) {
      return this.serviceOrdersRepository.findByMonth(month);
    }

    return this.serviceOrdersRepository.findAll();
  }
}
