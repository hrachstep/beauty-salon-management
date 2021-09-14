import { injectable, inject } from 'tsyringe';

import { OrdersPack } from '@domain/modules/services/entities/OrdersPack';
import { ServiceOrder } from '@domain/modules/services/entities/ServiceOrder';
import { IOrdersPackRepository } from '@domain/modules/services/interfaces/IOrdersPackRepository';
import { IServiceOrderRepository } from '@domain/modules/services/interfaces/IServiceOrderRepository';
import { IServiceRepository } from '@domain/modules/services/interfaces/IServiceRepository';
import { ApiError } from '@shared/errors/ApiError';

import { CreateServiceOrderUseCase } from '../createServiceOrder';

@injectable()
export class AddServiceOrderOnOrdersPackUseCase {
  readonly createServiceOrderUseCase: CreateServiceOrderUseCase;

  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,

    @inject('ServiceOrderRepository')
    private serviceOrdersRepository: IServiceOrderRepository,

    @inject('OrdersPackRepository')
    private ordersPackRepository: IOrdersPackRepository,
  ) {
    this.createServiceOrderUseCase = new CreateServiceOrderUseCase(
      this.serviceRepository,
      this.serviceOrdersRepository,
    );
  }

  async execute(packId: string, {
    date,
    servicesDoneId,
    image,
  }: ServiceOrder): Promise<OrdersPack> {
    if (!servicesDoneId?.length) throw new ApiError('No Services Done passed!');

    const pack = await this.ordersPackRepository.findById(packId);

    if (!pack) throw new ApiError('No Orders Pack found with this id!');

    const servicesCount = pack
      .servicesCount?.reduce((total, service) => total + service.quantity, 0);

    const ordersCount = pack
      .serviceOrders?.reduce((total, service) => total + service?.servicesDoneId?.length, 0);

    if (ordersCount + servicesDoneId.length > servicesCount) throw new ApiError('No Services to do remaining!');

    const serviceOrder = await this.createServiceOrderUseCase.execute({
      customer: pack.customer,
      date,
      servicesDoneId,
      price: 0,
      isFromPack: true,
      image,
    });

    const updatedPack = await this.ordersPackRepository.update({
      ...pack,
      serviceOrdersId: [
        serviceOrder.id,
        ...pack.serviceOrdersId ?? [],
      ],
    });

    return {
      ...updatedPack,
      serviceOrders: [
        serviceOrder,
        ...updatedPack.serviceOrders,
      ],
    };
  }
}
