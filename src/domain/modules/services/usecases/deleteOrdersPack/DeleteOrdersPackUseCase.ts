import { inject, injectable } from 'tsyringe';

import { IOrdersPackRepository } from '@domain/modules/services/interfaces/IOrdersPackRepository';

@injectable()
export class DeleteOrdersPackUseCase {
  constructor(
    @inject('OrdersPackRepository')
    private readonly ordersPackRepository: IOrdersPackRepository,
  ) {}

  async execute(id: string): Promise<string> {
    return this.ordersPackRepository.destroy(id);
  }
}
