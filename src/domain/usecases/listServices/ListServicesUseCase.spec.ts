import { Service } from '@domain/entities/Service';
import { IServiceRepository } from '@domain/interfaces/IServiceRepository';

import { ListServicesUseCase } from './ListServicesUseCase';

describe('List Services', () => {
  let useCase: ListServicesUseCase;
  let serviceRepository: IServiceRepository;
  const mock: Service = {
    date: new Date(),
    customer: 'Fake name',
    id: '12345',
    isFromPack: false,
    price: 45,
    servicesDoneIds: ['5689', '56684'],
  };

  beforeEach(() => {
    serviceRepository = {
      create: null,
      destroy: null,
      findAll: jest.fn(() => Promise.resolve(Array(5).fill(mock))),
      findByMonth: jest.fn(() => Promise.resolve(Array(2).fill(mock))),
      findById: null,
      findByIds: null,
      update: null,
    };

    useCase = new ListServicesUseCase(serviceRepository);
  });

  it('should return all services when no month is passed', async () => {
    const result = await useCase.execute({});
    expect(result).toHaveLength(5);
  });

  it('should return only services done in passed month', async () => {
    const date = new Date();

    const result = await useCase.execute({ month: date });

    expect(result).toHaveLength(2);
    expect(serviceRepository.findByMonth).toHaveBeenCalledWith(date);
  });
});
