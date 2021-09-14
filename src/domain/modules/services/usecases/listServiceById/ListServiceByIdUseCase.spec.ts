import { Service } from '@domain/modules/services/entities/Service';
import { IServiceRepository } from '@domain/modules/services/interfaces/IServiceRepository';
import { ApiError } from '@shared/errors/ApiError';

import { ListServiceByIdUseCase } from './ListServiceByIdUseCase';

describe('List Service by Id', () => {
  let useCase: ListServiceByIdUseCase;
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
      findAll: null,
      findByMonth: null,
      findById: jest.fn(() => Promise.resolve(mock)),
      findByIds: null,
      update: null,
    };

    useCase = new ListServiceByIdUseCase(serviceRepository);
  });

  it('should call repository with passed id', async () => {
    const id = '1234';
    await useCase.execute(id);
    expect(serviceRepository.findById).toHaveBeenCalledWith(id);
  });

  it('should return null when id dont exists', async () => {
    expect(async () => {
      serviceRepository.findById = jest.fn(() => Promise.resolve(null));

      await useCase.execute('1234');
    }).rejects.toBeInstanceOf(ApiError);
  });
});
