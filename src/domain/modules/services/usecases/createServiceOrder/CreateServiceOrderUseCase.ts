import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { ServiceOrder } from '@domain/modules/services/entities/ServiceOrder';
import { IServiceOrderRepository } from '@domain/modules/services/interfaces/IServiceOrderRepository';
import { IServiceRepository } from '@domain/modules/services/interfaces/IServiceRepository';
import { ApiError } from '@shared/errors/ApiError';

@injectable()
export class CreateServiceOrderUseCase {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,

    @inject('ServiceOrderRepository')
    private serviceOrdersRepository: IServiceOrderRepository,
  ) {}

  async execute({
    customer,
    date,
    servicesDoneId,
    price,
    image = '',
    isFromPack = false,
  }: ServiceOrder): Promise<ServiceOrder> {
    const id = uuidV4();

    if (!servicesDoneId?.length) throw new ApiError('You must send the Services Done Ids!');

    const existentsServicesTypes = await this.serviceRepository.findByIds(servicesDoneId);

    if (existentsServicesTypes.length < servicesDoneId.length) {
      throw new ApiError('Service Type doesnt exists!');
    }

    const service = await this.serviceOrdersRepository.create({
      id,
      customer,
      date,
      servicesDoneId,
      price,
      isFromPack,
      image,
    });

    return service;
  }
}
