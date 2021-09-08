import { IServicesPackRepository } from '@domain/interfaces/IServicesPackRepository';

import { DeleteServicesPackUseCase } from './DeleteServicesPackUseCase';

describe('Delete Service usecase', () => {
  const repository: IServicesPackRepository = {
    create: null,
    destroy: jest.fn(),
    findAll: null,
    findById: null,
    findByMonth: null,
    update: null,
  };

  const usecase = new DeleteServicesPackUseCase(repository);

  it('should call repository with passed "ID"', async () => {
    const id = '12345';
    await usecase.execute(id);
    expect(repository.destroy).toHaveBeenCalledWith(id);
  });
});
