import { ServiceType } from '@domain/modules/services/entities/ServiceType';
import { IOrdersPackRepository } from '@domain/modules/services/interfaces/IOrdersPackRepository';
import { IServiceTypeRepository } from '@domain/modules/services/interfaces/IServiceTypeRepository';
import { ApiError } from '@shared/errors/ApiError';

import { CreateOrdersPackUseCase } from './CreateOrdersPackUseCase';

describe('Create Orders Pack', () => {
  const servicesType: ServiceType[] = [];
  let createOrdersPackUsecase: CreateOrdersPackUseCase;
  let serviceTypeRepository: IServiceTypeRepository;
  let ordersPackRepository: IOrdersPackRepository;

  beforeAll(() => {
    servicesType.push({
      name: 'Manicure',
      id: '123',
    }, {
      name: 'Pedicure',
      id: '345',
    });

    serviceTypeRepository = {
      create: null,
      destroy: null,
      findAll: null,
      findById: null,
      findByName: null,
      findByIds: jest.fn(() => Promise.resolve(servicesType)),
      update: null,
    };

    ordersPackRepository = {
      create: jest.fn((x) => Promise.resolve(x)),
      update: null,
      destroy: null,
      findAll: null,
      findById: null,
      findByMonth: null,
    };
  });

  beforeEach(() => {
    createOrdersPackUsecase = new CreateOrdersPackUseCase(
      serviceTypeRepository, ordersPackRepository,
    );
  });

  it('should create a new services pack', async () => {
    const pack = await createOrdersPackUsecase.execute({
      customer: 'Débora',
      price: 120,
      startDate: new Date(),
      servicesCount: [{
        quantity: 4,
        serviceTypeId: '1234',
      }, {
        quantity: 2,
        serviceTypeId: '5678',
      }],
    });

    expect(pack).toHaveProperty('id');
    expect(pack.id).toBeTruthy();
  });

  it('should not create a pack if any service type doesnt exists', async () => {
    const customRepository = {
      ...serviceTypeRepository,
      findByIds: jest.fn(() => Promise.resolve([])),
    };

    createOrdersPackUsecase = new CreateOrdersPackUseCase(
      customRepository, ordersPackRepository,
    );

    expect(async () => {
      await createOrdersPackUsecase.execute({
        customer: 'Débora',
        price: 120,
        startDate: new Date(),
        servicesCount: [{
          quantity: 4,
          serviceTypeId: '1234',
        }, {
          quantity: 2,
          serviceTypeId: '5678',
        }],
      });
    }).rejects.toBeInstanceOf(ApiError);
  });

  it('should not create a pack without services count', async () => {
    expect(async () => {
      await createOrdersPackUsecase.execute({
        customer: 'Débora',
        price: 120,
        startDate: new Date(),
        servicesCount: [],
      });
    }).rejects.toBeInstanceOf(ApiError);
  });

  it('should remove all items from services count with quantity less than 1', async () => {
    const pack = await createOrdersPackUsecase.execute({
      customer: 'Débora',
      price: 120,
      startDate: new Date(),
      servicesCount: [
        {
          quantity: 4,
          serviceTypeId: '1234',
        }, {
          quantity: 4,
          serviceTypeId: '1234',
        }, {
          quantity: 0,
          serviceTypeId: '5678',
        }],
      services: [],
    });

    expect(pack.servicesCount.filter((item) => item.quantity < 1)).toHaveLength(0);
  });
});
