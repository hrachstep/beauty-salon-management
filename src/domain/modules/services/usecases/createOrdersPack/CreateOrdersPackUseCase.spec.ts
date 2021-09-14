import { Service } from '@domain/modules/services/entities/Service';
import { IOrdersPackRepository } from '@domain/modules/services/interfaces/IOrdersPackRepository';
import { IServiceRepository } from '@domain/modules/services/interfaces/IServiceRepository';
import { ApiError } from '@shared/errors/ApiError';

import { CreateOrdersPackUseCase } from './CreateOrdersPackUseCase';

describe('Create Orders Pack', () => {
  const servicesType: Service[] = [];
  let createOrdersPackUsecase: CreateOrdersPackUseCase;
  let serviceRepository: IServiceRepository;
  let ordersPackRepository: IOrdersPackRepository;

  beforeAll(() => {
    servicesType.push({
      name: 'Manicure',
      id: '123',
    }, {
      name: 'Pedicure',
      id: '345',
    });

    serviceRepository = {
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
      serviceRepository, ordersPackRepository,
    );
  });

  it('should create a new services pack', async () => {
    const pack = await createOrdersPackUsecase.execute({
      customer: 'Débora',
      price: 120,
      startDate: new Date(),
      servicesCount: [{
        quantity: 4,
        serviceId: '1234',
      }, {
        quantity: 2,
        serviceId: '5678',
      }],
    });

    expect(pack).toHaveProperty('id');
    expect(pack.id).toBeTruthy();
  });

  it('should not create a pack if any service type doesnt exists', async () => {
    const customRepository = {
      ...serviceRepository,
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
          serviceId: '1234',
        }, {
          quantity: 2,
          serviceId: '5678',
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
          serviceId: '1234',
        }, {
          quantity: 4,
          serviceId: '1234',
        }, {
          quantity: 0,
          serviceId: '5678',
        }],
      serviceOrders: [],
    });

    expect(pack.servicesCount.filter((item) => item.quantity < 1)).toHaveLength(0);
  });
});
