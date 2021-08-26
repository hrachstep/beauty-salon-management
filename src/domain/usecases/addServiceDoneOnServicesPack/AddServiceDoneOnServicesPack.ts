import { v4 as uuidV4 } from 'uuid';

import { Service } from '@domain/entities/Service';
import { ServicesPack } from '@domain/entities/ServicesPack';
import { IServicesPackRepository } from '@domain/interfaces/IServicesPackRepository';
import { ApiError } from '@shared/errors/ApiError';

export class AddServiceDoneOnServicesPack {
  constructor(private servicesPackRepository: IServicesPackRepository) {}

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
      .services?.reduce((total, service) => total + service?.servicesDone?.length, 0);

    if (countServicesDone >= countServicesToDo) throw new ApiError('No Services remaining!');

    const updatedPack = await this.servicesPackRepository.update({
      ...pack,
      services: [
        ...pack.services,
        {
          id: uuidV4(),
          date,
          servicesDoneIds,
          customer: pack.customer,
        },
      ],
    });

    return updatedPack;
  }
}
