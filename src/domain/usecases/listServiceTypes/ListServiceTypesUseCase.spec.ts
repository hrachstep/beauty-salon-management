import { ServiceType } from '@domain/entities/ServiceType';
import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';

import { ListServiceTypesUseCase } from './ListServiceTypesUseCase';

describe('List Service Typess', () => {
  let useCase: ListServiceTypesUseCase;
  let repository: IServiceTypeRepository;

  const mock: ServiceType = {
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

    useCase = new ListServiceTypesUseCase(repository);
  });

  it('should return all servicesTypes', async () => {
    const result = await useCase.execute();
    expect(result).toHaveLength(5);
    expect(repository.findAll).toHaveBeenCalled();
  });
});
