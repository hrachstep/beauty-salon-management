import { IServiceRepository } from '@domain/modules/services/interfaces/IServiceRepository';

import { DeleteServiceUsecase } from './DeleteServiceUseCase';

describe('Delete Service usecase', () => {
  const repository: IServiceRepository = {
    create: null,
    destroy: jest.fn(),
    findAll: null,
    findById: null,
    findByIds: null,
    findByName: null,
    update: null,
  };

  const usecase = new DeleteServiceUsecase(repository);

  it('should call repository with passed "ID"', async () => {
    const id = '12345';
    await usecase.execute(id);
    expect(repository.destroy).toHaveBeenCalledWith(id);
  });
});
