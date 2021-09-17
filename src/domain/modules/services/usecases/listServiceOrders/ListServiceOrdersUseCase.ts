import { inject, injectable } from 'tsyringe';

import { ServiceOrder } from '@domain/modules/services/entities/ServiceOrder';
import { IServiceOrderRepository } from '@domain/modules/services/interfaces/IServiceOrderRepository';
import { PaginationProps } from '@shared/types/pagination';

export type ListServiceOrdersUseCaseProps = {
  month?: Date;
} & PaginationProps;

@injectable()
export class ListServiceOrdersUseCase {
  constructor(
    @inject('ServiceOrderRepository')
    private serviceOrdersRepository: IServiceOrderRepository,
  ) {}

  async execute({
    month,
    page = 1,
    limit = 10,
  }: ListServiceOrdersUseCaseProps): Promise<ServiceOrder[]> {
    if (month) {
      return this.serviceOrdersRepository.findByMonth({ month, page, limit });
    }

    return this.serviceOrdersRepository.findAll({ page, limit });
  }
}
