import { inject, injectable } from 'tsyringe';

import { ServiceOrder } from '@domain/modules/services/entities/ServiceOrder';
import { IServiceOrderRepository } from '@domain/modules/services/interfaces/IServiceOrderRepository';
import { ApiError } from '@shared/errors/ApiError';

@injectable()
export class ListServiceOrderByIdUseCase {
  constructor(
    @inject('ServiceOrderRepository')
    private serviceOrdersRepository: IServiceOrderRepository,
  ) {}

  async execute(id: string): Promise<ServiceOrder> {
    if (!id) return null;

    const service = await this.serviceOrdersRepository.findById(id);

    if (!service) {
      throw new ApiError(`Service Order with id ${id} don't exists!`, 404);
    }

    return service;
  }
}
