import { inject, injectable } from 'tsyringe';

import { IServiceTypeRepository } from '@domain/modules/services/interfaces/IServiceTypeRepository';

@injectable()
export class DeleteServiceTypeUsecase {
  constructor(
    @inject('ServiceTypeRepository')
    private readonly serviceTypesRepository: IServiceTypeRepository,
  ) {}

  async execute(id: string): Promise<string> {
    return this.serviceTypesRepository.destroy(id);
  }
}
