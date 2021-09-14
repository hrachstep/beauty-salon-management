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
    const result = await useCase.execute();
    expect(result).toHaveLength(5);
    expect(repository.findAll).toHaveBeenCalled();
  });
});
