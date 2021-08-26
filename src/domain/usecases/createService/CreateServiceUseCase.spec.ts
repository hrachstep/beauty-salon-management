import { IServiceRepository } from '@domain/interfaces/IServiceRepository';
import { ApiError } from '@shared/errors/ApiError';

import { CreateServiceUseCase } from './CreateServiceUseCase';

describe('Create Service', () => {
  let usecase: CreateServiceUseCase;
  let repository: IServiceRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn((x) => Promise.resolve(x)),
      update: null,
      destroy: null,
      findAll: null,
      findById: null,
      findByMonth: null,
    };

    usecase = new CreateServiceUseCase(repository);
  });

  it('should create a new service', async () => {
    const service = await usecase.execute({
      customer: 'Débora',
      date: new Date(),
      servicesDoneIds: ['5567'],
      price: 25,
    });

    expect(service).toHaveProperty('id');
    expect(service.id).toBeTruthy();
  });

  it('should persists the created object on database', async () => {
    const service = await usecase.execute({
      customer: 'Débora',
      date: new Date(),
      servicesDoneIds: ['5892'],
      price: 45,
    });

    expect(repository.create).toBeCalledWith(service);
  });

  it('should not create object without services done ids', async () => {
    expect(async () => {
      await usecase.execute({
        customer: 'Débora',
        date: new Date(),
        servicesDoneIds: [],
        price: 45,
      });
    }).rejects.toBeInstanceOf(ApiError);
  });

  it('should have property isFromPack equals to null', async () => {
    const service = await usecase.execute({
      customer: 'Débora',
      date: new Date(),
      servicesDoneIds: ['5892'],
      price: 45,
    });

    expect(service.isFromPack).toBe(false);
  });
});
