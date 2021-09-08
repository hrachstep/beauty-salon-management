import { inject, injectable } from 'tsyringe';

import { IServiceRepository } from '@domain/interfaces/IServiceRepository';

@injectable()
export class DeleteServiceUseCase {
  constructor(
    @inject('ServiceRepository')
    private readonly servicesRepository: IServiceRepository,
  ) {}

  async execute(id: string): Promise<string> {
    return this.servicesRepository.destroy(id);
  }
}
