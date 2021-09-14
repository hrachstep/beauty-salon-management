import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { OrdersPack } from '@domain/modules/services/entities/OrdersPack';
import { IOrdersPackRepository } from '@domain/modules/services/interfaces/IOrdersPackRepository';
import { IServiceRepository } from '@domain/modules/services/interfaces/IServiceRepository';
import { ApiError } from '@shared/errors/ApiError';

@injectable()
export class CreateOrdersPackUseCase {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,

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

    const services = await this
      .serviceRepository
      .findByIds(filteredServicesCount.map((item) => item.serviceId));

    if (services.length !== filteredServicesCount.length) throw new ApiError('Any service type informed doesnt exists!');

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
