import { inject, injectable } from 'tsyringe';

import { IServiceOrderRepository } from '@domain/modules/services/interfaces/IServiceOrderRepository';

@injectable()
export class DeleteServiceOrderUseCase {
  constructor(
    @inject('ServiceOrderRepository')
    private readonly serviceOrderRepository: IServiceOrderRepository,
  ) {}

  async execute(id: string): Promise<string> {
    return this.serviceOrderRepository.destroy(id);
  }
}
