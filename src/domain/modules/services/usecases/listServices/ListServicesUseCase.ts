import { inject, injectable } from 'tsyringe';

import { Service } from '@domain/modules/services/entities/Service';
import { IServiceRepository } from '@domain/modules/services/interfaces/IServiceRepository';
import { PaginationProps } from '@shared/types/pagination';

@injectable()
export class ListServicesUseCase {
  constructor(
    @inject('ServiceRepository')
    private servicesRepository: IServiceRepository,
  ) {}

  async execute({
    page = 1,
    limit = 10,
  }: PaginationProps): Promise<Service[]> {
    return this.servicesRepository.findAll({
      page,
      limit,
    });
  }
}
