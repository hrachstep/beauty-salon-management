import { Service } from '@domain/modules/services/entities/Service';
import { IServiceRepository } from '@domain/modules/services/interfaces/IServiceRepository';

import { ListServicesUseCase } from './ListServicesUseCase';

describe('List Services', () => {
  let useCase: ListServicesUseCase;
  let repository: IServiceRepository;

  const mock: Service = {
    name: 'Service Name',
    id: '12345',
  };

  beforeEach(() => {
    repository = {
      create: null,
      findAll: jest.fn(() => Promise.resolve(Array(5).fill(mock))),
      findByName: null,
      findById: null,
      findByIds: null,
      destroy: null,
      update: null,
    };

    useCase = new ListServicesUseCase(repository);
  });

  it('should return all services', async () => {
    const result = await useCase.execute({});
    expect(result).toHaveLength(5);
    expect(repository.findAll).toHaveBeenCalled();
  });

  it('should call repository "findAll" with page 1 and limit 10 by default', async () => {
    await useCase.execute({});

    expect(repository.findAll).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
    });
  });

  it('should call repository "findAll" with passed page and limit params', async () => {
    await useCase.execute({ page: 3, limit: 8 });

    expect(repository.findAll).toHaveBeenCalledWith({
      page: 3,
      limit: 8,
    });
  });
});
