import { ServicesPack } from '@domain/entities/ServicesPack';
import { IServicesPackRepository } from '@domain/interfaces/IServicesPackRepository';
import { ApiError } from '@shared/errors/ApiError';

import { AddServiceDoneOnServicesPack } from './AddServiceDoneOnServicesPack';

describe('Add Service Done on Services Pack', () => {
  let usecase: AddServiceDoneOnServicesPack;
  let repository: IServicesPackRepository;

  const mockPack: ServicesPack = {
    id: '12345',
    startDate: new Date(),
    customer: 'Débora',
    price: 120,
    servicesCount: [
      {
        quantity: 4,
        serviceType: {
          name: 'Manicure',
        },
      },
      {
        quantity: 2,
        serviceType: {
          name: 'Pedicure',
        },
      },
    ],
    services: [],
  };

  beforeEach(() => {
    repository = {
      create: jest.fn((x) => Promise.resolve(x)),
      update: jest.fn((x) => Promise.resolve(x)),
      findAll: null,
      findById: jest.fn(() => Promise.resolve(mockPack)),
      destroy: null,
      findByMonth: null,
    };

    usecase = new AddServiceDoneOnServicesPack(repository);
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

    repository.findById = jest.fn(() => Promise.resolve(newMockPack));
    usecase = new AddServiceDoneOnServicesPack(repository);

    expect(async () => {
      await usecase.execute('123', {
        date: new Date(),
        servicesDoneIds: ['5689'],
      });
    }).rejects.toBeInstanceOf(ApiError);
  });
});
