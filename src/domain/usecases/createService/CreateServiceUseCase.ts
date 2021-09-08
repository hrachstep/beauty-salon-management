import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { Service } from '@domain/entities/Service';
import { IServiceRepository } from '@domain/interfaces/IServiceRepository';
import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';
import { ApiError } from '@shared/errors/ApiError';

@injectable()
export class CreateServiceUseCase {
  constructor(
    @inject('ServiceTypeRepository')
    private serviceTypeRepository: IServiceTypeRepository,

    @inject('ServiceRepository')
    private servicesRepository: IServiceRepository,
  ) {}

  async execute({
    customer,
    date,
    servicesDoneIds,
    price,
    isFromPack = false,
  }: Service): Promise<Service> {
    const id = uuidV4();

    if (!servicesDoneIds?.length) throw new ApiError('You must send the Services Done Ids!');

    const existentsServicesTypes = await this.serviceTypeRepository.findByIds(servicesDoneIds);

    if (existentsServicesTypes.length < servicesDoneIds.length) {
      throw new ApiError('Service Type doesnt exists!');
    }

    const service = await this.servicesRepository.create({
      id,
      customer,
      date,
      servicesDoneIds,
      price,
      isFromPack,
    });

    return service;
  }
}
