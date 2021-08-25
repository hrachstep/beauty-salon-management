import { ServiceType } from '@domain/entities/ServiceType';
import { IServicesPackRepository } from '@domain/interfaces/IServicesPackRepository';

import { ApiError } from '../../../shared/errors/ApiError';
import { CreateServicesPackUseCase } from './CreateServicesPackUseCase';

describe('Create Services Pack', () => {
  const servicesType: ServiceType[] = [];
  let createServicesPackUsecase: CreateServicesPackUseCase;
  let servicesPackRepository: IServicesPackRepository;

  beforeAll(() => {
    servicesType.push({
      name: 'Manicure',
      id: '123',
    }, {
      name: 'Pedicure',
      id: '345',
    });
  });

  beforeEach(() => {
    servicesPackRepository = {
      create: jest.fn((x) => Promise.resolve(x)),
      update: null,
      delete: null,
      findAll: null,
      findById: null,
      findByMonth: null,
    };

    createServicesPackUsecase = new CreateServicesPackUseCase(servicesPackRepository);
  });

  it('should create a new services pack', async () => {
    const pack = await createServicesPackUsecase.execute({
      customer: 'Débora',
      price: 120,
      startDate: new Date(),
      servicesCount: [{
        quantity: 4,
        serviceType: servicesType[0],
      }, {
        quantity: 2,
        serviceType: servicesType[1],
      }],
    });

    expect(pack).toHaveProperty('id');
    expect(pack.id).toBeTruthy();
  });

  it('should not create a pack without services count', async () => {
    expect(async () => {
      await createServicesPackUsecase.execute({
        customer: 'Débora',
        price: 120,
        startDate: new Date(),
        servicesCount: [],
      });
    }).rejects.toBeInstanceOf(ApiError);
  });

  it('should remove all items from services count with quantity less than 1', async () => {
    const pack = await createServicesPackUsecase.execute({
      customer: 'Débora',
      price: 120,
      startDate: new Date(),
      servicesCount: [{
        quantity: 4,
        serviceType: servicesType[0],
      }, {
        quantity: 0,
        serviceType: servicesType[1],
      }],
    });

    expect(pack.servicesCount.filter((item) => item.quantity < 1)).toHaveLength(0);
  });
});
