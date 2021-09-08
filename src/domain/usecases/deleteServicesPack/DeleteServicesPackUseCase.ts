import { inject, injectable } from 'tsyringe';

import { IServicesPackRepository } from '@domain/interfaces/IServicesPackRepository';

@injectable()
export class DeleteServicesPackUseCase {
  constructor(
    @inject('ServicesPackRepository')
    private readonly servicesPackRepository: IServicesPackRepository,
  ) {}

  async execute(id: string): Promise<string> {
    return this.servicesPackRepository.destroy(id);
  }
}
