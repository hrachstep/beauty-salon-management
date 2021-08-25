import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';
import { ApiError } from '@shared/errors/ApiError';

import { CreateServiceTypeUseCase } from './CreateServiceTypeUseCase';

const mockServiceType = {
  id: 'bla',
  name: 'Lucas',
};

describe('Create Service Type', () => {
  let usecase: CreateServiceTypeUseCase;
  let repository: IServiceTypeRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn((x) => Promise.resolve(x)),
      findAll: null,
      findById: null,
      findByName: jest.fn(() => Promise.resolve(null)),
      update: null,
    };

    usecase = new CreateServiceTypeUseCase(repository);
  });

  it('should create a new service type', async () => {
    const response = await usecase.execute(mockServiceType);

    expect(response).toHaveProperty('id');
    expect(response.id).toBeTruthy();
  });

  it('should persist created object on database', async () => {
    const response = await usecase.execute(mockServiceType);

    expect(repository.create).toBeCalledWith(response);
  });

  it('should not create if name already exists', async () => {
    repository.findByName = jest.fn(() => Promise.resolve(mockServiceType));
    usecase = new CreateServiceTypeUseCase(repository);

    expect(async () => {
      await usecase.execute(mockServiceType);
    }).rejects.toBeInstanceOf(ApiError);
  });
});
