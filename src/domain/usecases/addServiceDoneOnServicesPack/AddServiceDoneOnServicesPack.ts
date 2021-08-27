import { Service } from '@domain/entities/Service';
import { ServicesPack } from '@domain/entities/ServicesPack';
import { IServiceRepository } from '@domain/interfaces/IServiceRepository';
import { IServicesPackRepository } from '@domain/interfaces/IServicesPackRepository';
import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';
import { ApiError } from '@shared/errors/ApiError';

import { CreateServiceUseCase } from '../createService/CreateServiceUseCase';

export class AddServiceDoneOnServicesPack {
  readonly createServiceUseCase: CreateServiceUseCase;

  constructor(
    private serviceTypeRepository: IServiceTypeRepository,
    private servicesRepository: IServiceRepository,
    private servicesPackRepository: IServicesPackRepository,
  ) {
    this.createServiceUseCase = new CreateServiceUseCase(
      this.serviceTypeRepository,
      this.servicesRepository,
    );
  }

  async execute(packId: string, {
    date,
    servicesDoneIds,
  }: Service): Promise<ServicesPack> {
    if (!servicesDoneIds?.length) throw new ApiError('No Services Done passed!');

    const pack = await this.servicesPackRepository.findById(packId);
    if (!pack) throw new ApiError('No Services Pack found with this id!');

    const countServicesToDo = pack
      .servicesCount?.reduce((total, service) => total + service.quantity, 0);

    const countServicesDone = pack
      .services?.reduce((total, service) => total + service?.servicesDoneIds?.length, 0);

    if (countServicesDone + servicesDoneIds.length > countServicesToDo) throw new ApiError('No Services remaining!');

    const service = await this.createServiceUseCase.execute({
      customer: pack.customer,
      date,
      servicesDoneIds,
      isFromPack: true,
    });

    const updatedPack = await this.servicesPackRepository.update({
      ...pack,
      services: [
        ...pack.services,
        service,
      ],
    });

    return updatedPack;
  }
}
