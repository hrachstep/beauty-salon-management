import { inject, injectable } from 'tsyringe';

import { OrdersPack } from '@domain/modules/services/entities/OrdersPack';
import { IOrdersPackRepository } from '@domain/modules/services/interfaces/IOrdersPackRepository';

export type ListOrdersPacksUsecaseProps = {
  month?: Date;
}

@injectable()
export class ListOrdersPacksUseCase {
  constructor(
    @inject('OrdersPackRepository')
    private readonly ordersPacksRepository: IOrdersPackRepository,
  ) {}

  execute({ month }: ListOrdersPacksUsecaseProps): Promise<OrdersPack[]> {
    if (month) {
      return this.ordersPacksRepository.findByMonth(month);
    }

    return this.ordersPacksRepository.findAll();
  }
}
