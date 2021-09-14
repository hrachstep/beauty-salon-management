import { injectable, inject } from 'tsyringe';

import { OrdersPack } from '@domain/modules/services/entities/OrdersPack';
import { ServiceOrder } from '@domain/modules/services/entities/ServiceOrder';
import { IOrdersPackRepository } from '@domain/modules/services/interfaces/IOrdersPackRepository';
import { IServiceOrderRepository } from '@domain/modules/services/interfaces/IServiceOrderRepository';
import { IServiceTypeRepository } from '@domain/modules/services/interfaces/IServiceTypeRepository';
import { ApiError } from '@shared/errors/ApiError';

import { CreateServiceOrderUseCase } from '../createServiceOrder';

@injectable()
export class AddServiceOrderOnOrdersPackUseCase {
  readonly createServiceOrderUseCase: CreateServiceOrderUseCase;

  constructor(
    @inject('ServiceTypeRepository')
    private serviceTypeRepository: IServiceTypeRepository,

    @inject('ServiceOrderRepository')
    private serviceOrdersRepository: IServiceOrderRepository,

    @inject('OrdersPackRepository')
    private OrdersPackRepository: IOrdersPackRepository,
  ) {
    this.createServiceOrderUseCase = new CreateServiceOrderUseCase(
      this.serviceTypeRepository,
      this.serviceOrdersRepository,
    );
  }

  async execute(packId: string, {
    date,
    servicesDoneIds,
    image,
  }: ServiceOrder): Promise<OrdersPack> {
    if (!servicesDoneIds?.length) throw new ApiError('No Services Done passed!');

    const pack = await this.OrdersPackRepository.findById(packId);
    if (!pack) throw new ApiError('No Services Pack found with this id!');

    const countServicesToDo = pack
      .servicesCount?.reduce((total, service) => total + service.quantity, 0);

    const countServicesDone = pack
      .services?.reduce((total, service) => total + service?.servicesDoneIds?.length, 0);

    if (countServicesDone + servicesDoneIds.length > countServicesToDo) throw new ApiError('No Services remaining!');

    const service = await this.createServiceOrderUseCase.execute({
      customer: pack.customer,
      date,
      servicesDoneIds,
      price: 0,
      isFromPack: true,
      image,
    });

    const updatedPack = await this.OrdersPackRepository.update({
      ...pack,
      servicesId: [
        ...pack.servicesId ?? [],
        service.id,
      ],
    });

    return {
      ...updatedPack,
      services: [
        ...updatedPack.services,
        service,
      ],
    };
  }
}
