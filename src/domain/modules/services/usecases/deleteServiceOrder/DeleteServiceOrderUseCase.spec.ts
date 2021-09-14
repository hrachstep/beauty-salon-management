import { IServiceOrderRepository } from '@domain/modules/services/interfaces/IServiceOrderRepository';

import { DeleteServiceOrderUseCase } from './DeleteServiceOrderUseCase';

describe('Delete Service Order usecase', () => {
  const repository: IServiceOrderRepository = {
    create: null,
    destroy: jest.fn(),
    findAll: null,
    findById: null,
    findByIds: null,
    findByMonth: null,
    update: null,
  };

  const usecase = new DeleteServiceOrderUseCase(repository);

  it('should call repository with passed "ID"', async () => {
    const id = '12345';
    await usecase.execute(id);
    expect(repository.destroy).toHaveBeenCalledWith(id);
  });
});
