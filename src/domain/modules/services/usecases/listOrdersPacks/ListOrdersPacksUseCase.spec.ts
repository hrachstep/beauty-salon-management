import { IOrdersPackRepository } from '@domain/modules/services/interfaces/IOrdersPackRepository';

import { ListOrdersPacksUseCase } from './ListOrdersPacksUseCase';

describe('List Orders Packs usecase', () => {
  const repository: IOrdersPackRepository = {
    create: null,
    destroy: null,
    findAll: jest.fn(() => Promise.resolve([])),
    findByMonth: jest.fn(() => Promise.resolve([])),
    findById: null,
    update: null,
  };

  const usecase = new ListOrdersPacksUseCase(repository);

  it('should call repository "findAll" when month is not passed', async () => {
    await usecase.execute({});
    expect(repository.findAll).toHaveBeenCalled();
  });

  it('should call repository "findAll" with page 1 and limit 10 by default', async () => {
    await usecase.execute({});

    expect(repository.findAll).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
    });
  });

  it('should call repository "findAll" with passed page and limit', async () => {
    await usecase.execute({ page: 2, limit: 20 });

    expect(repository.findAll).toHaveBeenCalledWith({
      page: 2,
      limit: 20,
    });
  });

  it('should call repository "findByMonth" with page 1 and limit 10 by default', async () => {
    const date = new Date();
    await usecase.execute({ month: date });

    expect(repository.findByMonth).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
      month: date,
    });
  });

  it('should call repository "findByMonth" with passed page, limit and month', async () => {
    const date = new Date();
    await usecase.execute({ page: 2, limit: 20, month: date });

    expect(repository.findByMonth).toHaveBeenCalledWith({
      page: 2,
      limit: 20,
      month: date,
    });
  });
});
