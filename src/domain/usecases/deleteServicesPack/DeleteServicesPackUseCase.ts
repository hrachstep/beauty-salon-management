import { IServicesPackRepository } from '@domain/interfaces/IServicesPackRepository';

export class DeleteServicesPackUseCase {
  constructor(private readonly servicesPackRepository: IServicesPackRepository) {}

  async execute(id: string): Promise<string> {
    return this.servicesPackRepository.destroy(id);
  }
}
