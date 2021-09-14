import { IServiceRepository } from '@domain/modules/services/interfaces/IServiceRepository';
import { ApiError } from '@shared/errors/ApiError';

import { CreateServiceUseCase } from './CreateServiceUseCase';

const mockService = {
  id: 'bla',
  name: 'Lucas',
};

describe('Create Service', () => {
  let usecase: CreateServiceUseCase;
  let repository: IServiceRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn((x) => Promise.resolve(x)),
      destroy: null,
      findAll: null,
      findById: null,
      findByIds: null,
      findByName: jest.fn(() => Promise.resolve(null)),
      update: null,
    };

    usecase = new CreateServiceUseCase(repository);
  });

  it('should create a new service type', async () => {
    const response = await usecase.execute(mockService);

    expect(response).toHaveProperty('id');
    expect(response.id).toBeTruthy();
  });

  it('should persist created object on database', async () => {
    const response = await usecase.execute(mockService);

    expect(repository.create).toBeCalledWith(response);
  });

  it('should not create if name already exists', async () => {
    repository.findByName = jest.fn(() => Promise.resolve(mockService));
    usecase = new CreateServiceUseCase(repository);

    expect(async () => {
      await usecase.execute(mockService);
    }).rejects.toBeInstanceOf(ApiError);
  });
});
