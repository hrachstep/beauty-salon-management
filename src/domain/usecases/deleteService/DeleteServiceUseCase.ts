import { IServiceRepository } from '@domain/interfaces/IServiceRepository';

export class DeleteServiceUseCase {
  constructor(private readonly servicesRepository: IServiceRepository) {}

  async execute(id: string): Promise<string> {
    return this.servicesRepository.destroy(id);
  }
}
