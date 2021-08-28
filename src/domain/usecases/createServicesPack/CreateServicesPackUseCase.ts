import { v4 as uuidV4 } from 'uuid';

import { ServicesPack } from '@domain/entities/ServicesPack';
import { IServicesPackRepository } from '@domain/interfaces/IServicesPackRepository';
import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';
import { ApiError } from '@shared/errors/ApiError';

export class CreateServicesPackUseCase {
  constructor(
    private serviceTypeRepository: IServiceTypeRepository,
    private servicesPackRepository: IServicesPackRepository,
  ) {}

  async execute({
    customer,
    price,
    servicesCount,
    startDate,
  }: ServicesPack): Promise<ServicesPack> {
    const filteredServicesCount = servicesCount?.filter((service) => service.quantity > 0);

    if (!filteredServicesCount?.length) throw new ApiError('You should send the services count!', 400);

    const serviceTypes = await this
      .serviceTypeRepository
      .findByIds(filteredServicesCount.map((item) => item.serviceTypeId));

    if (serviceTypes.length !== filteredServicesCount.length) throw new ApiError('Any service type informed doesnt exists!');

    const pack = await this.servicesPackRepository.create({
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
