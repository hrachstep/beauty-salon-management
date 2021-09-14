import { IOrdersPackRepository } from '@domain/modules/services/interfaces/IOrdersPackRepository';

import { DeleteOrdersPackUseCase } from './DeleteOrdersPackUseCase';

describe('Delete Orders Pack usecase', () => {
  const repository: IOrdersPackRepository = {
    create: null,
    destroy: jest.fn(),
    findAll: null,
    findById: null,
    findByMonth: null,
    update: null,
  };

  const usecase = new DeleteOrdersPackUseCase(repository);

  it('should call repository with passed "ID"', async () => {
    const id = '12345';
    await usecase.execute(id);
    expect(repository.destroy).toHaveBeenCalledWith(id);
  });
});
