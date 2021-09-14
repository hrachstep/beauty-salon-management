import request from 'supertest';

import { OrdersPack } from '@domain/modules/services/entities/OrdersPack';
import { Service } from '@domain/modules/services/entities/Service';
import { OrdersPackRepository } from '@infrastructure/repositories/OrdersPackRepository';
import { ServiceOrderRepository } from '@infrastructure/repositories/ServiceOrderRepository';
import { ServiceRepository } from '@infrastructure/repositories/ServiceRepository';
import { createApp } from '@main/config/app';
import { authHeaders } from '@shared/tests/authHeaders';
import { mockAuthProvider } from '@shared/tests/mockAuthProvider';

mockAuthProvider();

describe('Add Service Order on Orders Pack', () => {
  let service: Service;
  let pack: OrdersPack;

  const servicesRepository = new ServiceRepository();
  const serviceOrdersRepository = new ServiceOrderRepository(servicesRepository);
  const ordersPackRepository = new OrdersPackRepository(
    servicesRepository,
    serviceOrdersRepository,
  );

  const app = createApp();
  const route = (id: string) => `/orders-packs/${id}/orders`;

  beforeAll(async () => {
    let response = await request(app)
      .post('/services')
      .set(authHeaders)
      .send({ name: 'Fake Name' });

    service = response.body;

    response = await request(app)
      .post('/orders-packs')
      .set(authHeaders)
      .send({
        customer: 'Fake Customer',
        price: 120,
        startDate: '2021-09-04',
        servicesCount: [
          {
            serviceId: service.id,
            quantity: 1,
          },
        ],
      });

    pack = response.body;
  });

  afterAll(async () => {
    if (service?.id) await servicesRepository.destroy(service.id);
    if (pack?.id) await ordersPackRepository.destroy(pack.id);
  });

  it('should send status 400 when "date" is invalid', async () => {
    const response = await request(app)
      .post(route(pack.id))
      .set(authHeaders)
      .send({
        date: 'invalid date',
        servicesDoneId: [service.id],
      });

    expect(response.statusCode).toBe(400);
  });

  it('should send status 400 when "servicesDoneId" is invalid', async () => {
    const response = await request(app)
      .post(route(pack.id))
      .set(authHeaders)
      .send({
        date: '2021-09-04',
        servicesDoneId: [],
      });

    expect(response.statusCode).toBe(400);
  });

  it('should send status 401 when authentications headers is invalid', async () => {
    const response = await request(app)
      .post(route(pack.id))
      .send({
        date: '2021-09-04',
        servicesDoneId: [],
      });

    expect(response.statusCode).toBe(401);
  });

  it('should send status 201 and return created object on success', async () => {
    const response = await request(app)
      .post(route(pack.id))
      .set(authHeaders)
      .send({
        date: '2021-09-04',
        servicesDoneId: [service.id],
      });

    const { id } = response.body;

    expect(response.statusCode).toBe(201);
    expect(id).toBeTruthy();

    if (id) await servicesRepository.destroy(id);
  });
});
