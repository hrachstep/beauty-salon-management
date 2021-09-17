import { inject, injectable } from 'tsyringe';

import { OrdersPack } from '@domain/modules/services/entities/OrdersPack';
import { IOrdersPackRepository } from '@domain/modules/services/interfaces/IOrdersPackRepository';
import { PaginationProps } from '@shared/types/pagination';

export type ListOrdersPacksUsecaseProps = {
  month?: Date;
} & PaginationProps

@injectable()
export class ListOrdersPacksUseCase {
  constructor(
    @inject('OrdersPackRepository')
    private readonly ordersPacksRepository: IOrdersPackRepository,
  ) {}

  execute({ month, page = 1, limit = 10 }: ListOrdersPacksUsecaseProps): Promise<OrdersPack[]> {
    if (month) {
      return this.ordersPacksRepository.findByMonth({ month, page, limit });
    }

    return this.ordersPacksRepository.findAll({ page, limit });
  }
}
