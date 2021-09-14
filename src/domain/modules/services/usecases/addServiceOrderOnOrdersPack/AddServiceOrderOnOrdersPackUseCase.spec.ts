import { OrdersPack } from '@domain/modules/services/entities/OrdersPack';
import { IOrdersPackRepository } from '@domain/modules/services/interfaces/IOrdersPackRepository';
import { IServiceOrderRepository } from '@domain/modules/services/interfaces/IServiceOrderRepository';
import { IServiceTypeRepository } from '@domain/modules/services/interfaces/IServiceTypeRepository';
import { ApiError } from '@shared/errors/ApiError';

import { AddServiceOrderOnOrdersPackUseCase } from './AddServiceOrderOnOrdersPackUseCase';

describe('Add Service Order on Orders Pack', () => {
  let usecase: AddServiceOrderOnOrdersPackUseCase;
  let OrdersPackRepository: IOrdersPackRepository;
  let serviceOrdersRepository: IServiceOrderRepository;
  let serviceTypeRepository: IServiceTypeRepository;

  const mockPack: OrdersPack = {
    id: '12345',
    startDate: new Date(),
    customer: 'Débora',
    price: 120,
    servicesCount: [
      {
        quantity: 4,
        serviceTypeId: '1234',
      },
      {
        quantity: 2,
        serviceTypeId: '5678',
      },
    ],
    services: [],
  };

  beforeEach(() => {
    serviceTypeRepository = {
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
      serviceTypeRepository,
      serviceOrdersRepository,
      OrdersPackRepository,
    );
  });

  it('should add a service on a existent services pack', async () => {
    const pack = await usecase.execute('123', {
      date: new Date(),
      servicesDoneIds: ['1234'],
    });

    expect(pack.id).toBeTruthy();
    expect(pack.customer).toBeTruthy();
    expect(pack.services[pack.services.length - 1].id).toBeTruthy();
  });

  it('should not add a service without services done', async () => {
    expect(async () => {
      await usecase.execute('123', {
        date: new Date(),
        servicesDoneIds: [],
      });
    }).rejects.toBeInstanceOf(ApiError);
  });

  it('should not add service if there\'s not services remain', async () => {
    const newMockPack: OrdersPack = {
      ...mockPack,
      services: [
        { date: new Date(), servicesDoneIds: ['5689', '1234'] },
        { date: new Date(), servicesDoneIds: ['5689'] },
        { date: new Date(), servicesDoneIds: ['5689', '1234'] },
        { date: new Date(), servicesDoneIds: ['5689'] },
      ],
    };

    OrdersPackRepository.findById = jest.fn(() => Promise.resolve(newMockPack));

    usecase = new AddServiceOrderOnOrdersPackUseCase(
      serviceTypeRepository,
      serviceOrdersRepository,
      OrdersPackRepository,
    );

    expect(async () => {
      await usecase.execute('123', {
        date: new Date(),
        servicesDoneIds: ['5689'],
      });
    }).rejects.toBeInstanceOf(ApiError);
  });
});
