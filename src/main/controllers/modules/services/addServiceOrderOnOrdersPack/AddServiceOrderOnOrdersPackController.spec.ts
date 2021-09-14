import request from 'supertest';

import { OrdersPack } from '@domain/modules/services/entities/OrdersPack';
import { ServiceType } from '@domain/modules/services/entities/ServiceType';
import { OrdersPackRepository } from '@infrastructure/repositories/OrdersPackRepository';
import { ServiceOrderRepository } from '@infrastructure/repositories/ServiceOrderRepository';
import { ServiceTypeRepository } from '@infrastructure/repositories/ServiceTypeRepository';
import { createApp } from '@main/config/app';
import { authHeaders } from '@shared/tests/authHeaders';
import { mockAuthProvider } from '@shared/tests/mockAuthProvider';

mockAuthProvider();

describe('Add Service Done on Services Pack', () => {
  let serviceType: ServiceType;
  let pack: OrdersPack;

  const serviceTypesRepository = new ServiceTypeRepository();
  const servicesRepository = new ServiceOrderRepository(serviceTypesRepository);
  const ordersPackRepository = new OrdersPackRepository(
    serviceTypesRepository,
    servicesRepository,
  );

  const app = createApp();
  const route = (id: string) => `/orders-packs/${id}/orders`;

  beforeAll(async () => {
    let response = await request(app)
      .post('/service-types')
      .set(authHeaders)
      .send({ name: 'Fake Random Name' });

    serviceType = response.body;

    response = await request(app)
      .post('/orders-packs')
      .set(authHeaders)
      .send({
        customer: 'Fake Customer',
        price: 120,
        startDate: '2021-09-04',
        servicesCount: [
          {
            serviceTypeId: serviceType.id,
            quantity: 1,
          },
        ],
      });

    pack = response.body;
  });

  afterAll(async () => {
    if (serviceType?.id) await serviceTypesRepository.destroy(serviceType.id);
    if (pack?.id) await ordersPackRepository.destroy(pack.id);
  });

  it('should send status 400 when "date" is invalid', async () => {
    const response = await request(app)
      .post(route(pack.id))
      .set(authHeaders)
      .send({
        date: 'invalid date',
        servicesDoneIds: [serviceType.id],
      });

    expect(response.statusCode).toBe(400);
  });

  it('should send status 400 when "servicesDoneIds" is invalid', async () => {
    const response = await request(app)
      .post(route(pack.id))
      .set(authHeaders)
      .send({
        date: '2021-09-04',
        servicesDoneIds: [],
      });

    expect(response.statusCode).toBe(400);
  });

  it('should send status 401 when authentications headers is invalid', async () => {
    const response = await request(app)
      .post(route(pack.id))
      .send({
        date: '2021-09-04',
        servicesDoneIds: [],
      });

    expect(response.statusCode).toBe(401);
  });

  it('should send status 201 and return created object on success', async () => {
    const response = await request(app)
      .post(route(pack.id))
      .set(authHeaders)
      .send({
        date: '2021-09-04',
        servicesDoneIds: [serviceType.id],
      });

    const { id } = response.body;

    expect(response.statusCode).toBe(201);
    expect(id).toBeTruthy();

    if (id) await servicesRepository.destroy(id);
  });
});
