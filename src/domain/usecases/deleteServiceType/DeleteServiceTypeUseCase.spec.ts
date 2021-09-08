import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';

import { DeleteServiceTypeRepository } from './DeleteServiceTypeUseCase';

describe('Delete Service Type usecase', () => {
  const repository: IServiceTypeRepository = {
    create: null,
    destroy: jest.fn(),
    findAll: null,
    findById: null,
    findByIds: null,
    findByName: null,
    update: null,
  };

  const usecase = new DeleteServiceTypeRepository(repository);

  it('should call repository with passed "ID"', async () => {
    const id = '12345';
    await usecase.execute(id);
    expect(repository.destroy).toHaveBeenCalledWith(id);
  });
});
