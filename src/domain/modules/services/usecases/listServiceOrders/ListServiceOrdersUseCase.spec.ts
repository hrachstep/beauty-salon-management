import { ServiceOrder } from '@domain/modules/services/entities/ServiceOrder';
import { IServiceOrderRepository } from '@domain/modules/services/interfaces/IServiceOrderRepository';

import { ListServiceOrdersUseCase } from './ListServiceOrdersUseCase';

describe('List ServiceOrders', () => {
  let useCase: ListServiceOrdersUseCase;
  let serviceorderRepository: IServiceOrderRepository;
  const mock: ServiceOrder = {
    date: new Date(),
    customer: 'Fake name',
    id: '12345',
    isFromPack: false,
    price: 45,
    servicesDoneIds: ['5689', '56684'],
  };

  beforeEach(() => {
    serviceorderRepository = {
      create: null,
      destroy: null,
      findAll: jest.fn(() => Promise.resolve(Array(5).fill(mock))),
      findByMonth: jest.fn(() => Promise.resolve(Array(2).fill(mock))),
      findById: null,
      findByIds: null,
      update: null,
    };

    useCase = new ListServiceOrdersUseCase(serviceorderRepository);
  });

  it('should return all serviceorders when no month is passed', async () => {
    const result = await useCase.execute({});
    expect(result).toHaveLength(5);
  });

  it('should return only serviceorders done in passed month', async () => {
    const date = new Date();

    const result = await useCase.execute({ month: date });

    expect(result).toHaveLength(2);
    expect(serviceorderRepository.findByMonth).toHaveBeenCalledWith(date);
  });
});
