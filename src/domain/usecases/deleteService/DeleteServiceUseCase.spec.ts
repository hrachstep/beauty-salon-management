import { IServiceRepository } from '@domain/interfaces/IServiceRepository';

import { DeleteServiceUseCase } from './DeleteServiceUseCase';

describe('Delete Service usecase', () => {
  const repository: IServiceRepository = {
    create: null,
    destroy: jest.fn(),
    findAll: null,
    findById: null,
    findByIds: null,
    findByMonth: null,
    update: null,
  };

  const usecase = new DeleteServiceUseCase(repository);

  it('should call repository with passed "ID"', async () => {
    const id = '12345';
    await usecase.execute(id);
    expect(repository.destroy).toHaveBeenCalledWith(id);
  });
});
