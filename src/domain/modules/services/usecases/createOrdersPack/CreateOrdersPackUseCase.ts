import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { OrdersPack } from '@domain/modules/services/entities/OrdersPack';
import { IOrdersPackRepository } from '@domain/modules/services/interfaces/IOrdersPackRepository';
import { IServiceTypeRepository } from '@domain/modules/services/interfaces/IServiceTypeRepository';
import { ApiError } from '@shared/errors/ApiError';

@injectable()
export class CreateOrdersPackUseCase {
  constructor(
    @inject('ServiceTypeRepository')
    private serviceTypeRepository: IServiceTypeRepository,

    @inject('OrdersPackRepository')
    private ordersPackRepository: IOrdersPackRepository,
  ) {}

  async execute({
    customer,
    price,
    servicesCount,
    startDate,
  }: OrdersPack): Promise<OrdersPack> {
    const filteredServicesCount = servicesCount?.filter((service) => service.quantity > 0);

    if (!filteredServicesCount?.length) throw new ApiError('You should send the services count!', 400);

    const serviceTypes = await this
      .serviceTypeRepository
      .findByIds(filteredServicesCount.map((item) => item.serviceTypeId));

    if (serviceTypes.length !== filteredServicesCount.length) throw new ApiError('Any service type informed doesnt exists!');

    const pack = await this.ordersPackRepository.create({
      id: uuidV4(),
      servicesCount: filteredServicesCount,
      services: [],
      servicesId: [],
      customer,
      price,
      startDate,
    });

    return pack;
  }
}
