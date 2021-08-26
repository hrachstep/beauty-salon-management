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
    });

    expect(service).toHaveProperty('id');
    expect(service.id).toBeTruthy();
  });

  it('should persists the created object on database', async () => {
    const service = await usecase.execute({
      customer: 'Débora',
      date: new Date(),
      servicesDoneIds: ['5892'],
    });

    expect(repository.create).toBeCalledWith(service);
  });

  it('should not create object without services done ids', async () => {
    expect(async () => {
      await usecase.execute({
        customer: 'Débora',
        date: new Date(),
        servicesDoneIds: [],
      });
    }).rejects.toBeInstanceOf(ApiError);
  });
});
