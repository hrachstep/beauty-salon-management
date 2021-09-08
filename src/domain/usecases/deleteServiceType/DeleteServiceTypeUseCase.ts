import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';

export class DeleteServiceTypeRepository {
  constructor(private readonly serviceTypesRepository: IServiceTypeRepository) {}

  async execute(id: string): Promise<string> {
    return this.serviceTypesRepository.destroy(id);
  }
}
