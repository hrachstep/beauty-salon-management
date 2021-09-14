import { OrdersPack } from '@domain/modules/services/entities/OrdersPack';
import { IOrdersPackRepository } from '@domain/modules/services/interfaces/IOrdersPackRepository';
import { IServiceOrderRepository } from '@domain/modules/services/interfaces/IServiceOrderRepository';
import { IServiceRepository } from '@domain/modules/services/interfaces/IServiceRepository';
import { ApiError } from '@shared/errors/ApiError';

import { AddServiceOrderOnOrdersPackUseCase } from './AddServiceOrderOnOrdersPackUseCase';

describe('Add Service Order on Orders Pack', () => {
  let usecase: AddServiceOrderOnOrdersPackUseCase;
  let OrdersPackRepository: IOrdersPackRepository;
  let serviceOrdersRepository: IServiceOrderRepository;
  let serviceRepository: IServiceRepository;

  const mockPack: OrdersPack = {
    id: '12345',
    startDate: new Date(),
    customer: 'Débora',
    price: 120,
    servicesCount: [
      {
        quantity: 4,
        serviceId: '1234',
      },
      {
        quantity: 2,
        serviceId: '5678',
      },
    ],
    serviceOrders: [],
  };

  beforeEach(() => {
    serviceRepository = {
      create: null,
      update: null,
      findAll: null,
      destroy: null,
      findById: jest.fn(() => Promise.resolve({
        name: 'Manicure',
        id: '1234',
      })),
      findByIds: jest.fn(() => Promise.resolve([
        { name: 'Manicure', id: '1234' },
        { name: 'Pedicure', id: '4567' },
      ])),
      findByName: null,
    };

    OrdersPackRepository = {
      create: jest.fn((x) => Promise.resolve(x)),
      update: jest.fn((x) => Promise.resolve(x)),
      findAll: null,
      findById: jest.fn(() => Promise.resolve(mockPack)),
      destroy: null,
      findByMonth: null,
    };

    serviceOrdersRepository = {
      create: jest.fn((x) => Promise.resolve(x)),
      destroy: null,
      findAll: null,
      findById: null,
      findByIds: null,
      findByMonth: null,
      update: null,
    };

    usecase = new AddServiceOrderOnOrdersPackUseCase(
      serviceRepository,
      serviceOrdersRepository,
      OrdersPackRepository,
    );
  });

  it('should add a service on a existent services pack', async () => {
    const pack = await usecase.execute('123', {
      date: new Date(),
      servicesDoneId: ['1234'],
    });

    expect(pack.id).toBeTruthy();
    expect(pack.customer).toBeTruthy();
    expect(pack.serviceOrders[0].id).toBeTruthy();
  });

  it('should not add a service without services done', async () => {
    expect(async () => {
      await usecase.execute('123', {
        date: new Date(),
        servicesDoneId: [],
      });
    }).rejects.toBeInstanceOf(ApiError);
  });

  it('should not add service if there\'s not services remain', async () => {
    const newMockPack: OrdersPack = {
      ...mockPack,
      serviceOrders: [
        { date: new Date(), servicesDoneId: ['5689', '1234'] },
        { date: new Date(), servicesDoneId: ['5689'] },
        { date: new Date(), servicesDoneId: ['5689', '1234'] },
        { date: new Date(), servicesDoneId: ['5689'] },
      ],
    };

    OrdersPackRepository.findById = jest.fn(() => Promise.resolve(newMockPack));

    usecase = new AddServiceOrderOnOrdersPackUseCase(
      serviceRepository,
      serviceOrdersRepository,
      OrdersPackRepository,
    );

    expect(async () => {
      await usecase.execute('123', {
        date: new Date(),
        servicesDoneId: ['5689'],
      });
    }).rejects.toBeInstanceOf(ApiError);
  });
});
