import { ServicesPack } from '@domain/entities/ServicesPack';
import { IServiceRepository } from '@domain/interfaces/IServiceRepository';
import { IServicesPackRepository } from '@domain/interfaces/IServicesPackRepository';
import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';
import { ApiError } from '@shared/errors/ApiError';

import { AddServiceDoneOnServicesPack } from './AddServiceDoneOnServicesPack';

describe('Add Service Done on Services Pack', () => {
  let usecase: AddServiceDoneOnServicesPack;
  let servicesPackRepository: IServicesPackRepository;
  let servicesRepository: IServiceRepository;
  let serviceTypeRepository: IServiceTypeRepository;

  const mockPack: ServicesPack = {
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

    servicesPackRepository = {
      create: jest.fn((x) => Promise.resolve(x)),
      update: jest.fn((x) => Promise.resolve(x)),
      findAll: null,
      findById: jest.fn(() => Promise.resolve(mockPack)),
      destroy: null,
      findByMonth: null,
    };

    servicesRepository = {
      create: jest.fn((x) => Promise.resolve(x)),
      destroy: null,
      findAll: null,
      findById: null,
      findByIds: null,
      findByMonth: null,
      update: null,
    };

    usecase = new AddServiceDoneOnServicesPack(
      serviceTypeRepository,
      servicesRepository,
      servicesPackRepository,
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
    const newMockPack: ServicesPack = {
      ...mockPack,
      services: [
        { date: new Date(), servicesDoneIds: ['5689', '1234'] },
        { date: new Date(), servicesDoneIds: ['5689'] },
        { date: new Date(), servicesDoneIds: ['5689', '1234'] },
        { date: new Date(), servicesDoneIds: ['5689'] },
      ],
    };

    servicesPackRepository.findById = jest.fn(() => Promise.resolve(newMockPack));

    usecase = new AddServiceDoneOnServicesPack(
      serviceTypeRepository,
      servicesRepository,
      servicesPackRepository,
    );

    expect(async () => {
      await usecase.execute('123', {
        date: new Date(),
        servicesDoneIds: ['5689'],
      });
    }).rejects.toBeInstanceOf(ApiError);
  });
});
