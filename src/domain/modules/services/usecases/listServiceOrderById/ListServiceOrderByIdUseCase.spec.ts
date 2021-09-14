import { ServiceOrder } from '@domain/modules/services/entities/ServiceOrder';
import { IServiceOrderRepository } from '@domain/modules/services/interfaces/IServiceOrderRepository';
import { ApiError } from '@shared/errors/ApiError';

import { ListServiceOrderByIdUseCase } from './ListServiceOrderByIdUseCase';

describe('List Service Order by Id', () => {
  let useCase: ListServiceOrderByIdUseCase;
  let serviceOrderRepository: IServiceOrderRepository;

  const mock: ServiceOrder = {
    date: new Date(),
    customer: 'Fake name',
    id: '12345',
    isFromPack: false,
    price: 45,
    servicesDoneIds: ['5689', '56684'],
  };

  beforeEach(() => {
    serviceOrderRepository = {
      create: null,
      destroy: null,
      findAll: null,
      findByMonth: null,
      findById: jest.fn(() => Promise.resolve(mock)),
      findByIds: null,
      update: null,
    };

    useCase = new ListServiceOrderByIdUseCase(serviceOrderRepository);
  });

  it('should call repository with passed id', async () => {
    const id = '1234';
    await useCase.execute(id);
    expect(serviceOrderRepository.findById).toHaveBeenCalledWith(id);
  });

  it('should return null when id dont exists', async () => {
    expect(async () => {
      serviceOrderRepository.findById = jest.fn(() => Promise.resolve(null));

      await useCase.execute('1234');
    }).rejects.toBeInstanceOf(ApiError);
  });
});
