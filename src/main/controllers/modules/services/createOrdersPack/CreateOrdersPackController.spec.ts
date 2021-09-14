import request from 'supertest';

import { Service } from '@domain/modules/services/entities/Service';
import { OrdersPackRepository } from '@infrastructure/repositories/OrdersPackRepository';
import { ServiceOrderRepository } from '@infrastructure/repositories/ServiceOrderRepository';
import { ServiceRepository } from '@infrastructure/repositories/ServiceRepository';
import { createApp } from '@main/config/app';
import { authHeaders } from '@shared/tests/authHeaders';
import { mockAuthProvider } from '@shared/tests/mockAuthProvider';

mockAuthProvider();

describe('Create Services Pack', () => {
  const servicesRepository = new ServiceRepository();
  const serviceOrdersRepository = new ServiceOrderRepository(servicesRepository);
  const ordersPackRepository = new OrdersPackRepository(
    servicesRepository,
    serviceOrdersRepository,
  );

  let service: Service;
  const app = createApp();
  const route = '/orders-packs';

  beforeAll(async () => {
    service = await servicesRepository.create({
      id: 'test-id',
      name: 'Fake Name',
    });
  });

  afterAll(async () => {
    if (service.id) { await servicesRepository.destroy(service.id); }
  });

  it('should send status 400 if "customer" name is empty', async () => {
    const response = await request(app)
      .post(route)
      .set(authHeaders)
      .send({
        customer: '',
        price: 120,
        servicesCount: [],
        startDate: '2021-09-04',
      });

    expect(response.statusCode).toBe(400);
  });

  it('should send status 400 if "price" is not numeric', async () => {
    const response = await request(app)
      .post(route)
      .set(authHeaders)
      .send({
        customer: 'Fake name',
        price: 'non numeric',
        servicesCount: [],
        startDate: '2021-09-04',
      });

    expect(response.statusCode).toBe(400);
  });

  it('should send status 400 if "startDate" is not date', async () => {
    const response = await request(app)
      .post(route)
      .set(authHeaders)
      .send({
        customer: 'Fake name',
        price: 45,
        servicesCount: [],
        startDate: 'incorrect date',
      });

    expect(response.statusCode).toBe(400);
  });

  it('should send status 400 if "servicesCont" lenght is less than 1', async () => {
    const response = await request(app)
      .post(route)
      .set(authHeaders)
      .send({
        customer: 'Fake name',
        price: 45,
        servicesCount: [],
        startDate: 'incorrect date',
      });

    expect(response.statusCode).toBe(400);
  });

  it('should send status 400 if "servicesCont" isnt a array of object with "count" and "serviceId" valid props', async () => {
    const response = await request(app)
      .post(route)
      .set(authHeaders)
      .send({
        customer: 'Fake name',
        price: 45,
        servicesCount: [
          {
            serviceId: '',
            quantity: 'a',
          },
        ],
        startDate: 'incorrect date',
      });

    expect(response.statusCode).toBe(400);
  });

  it('should send status 201 and return created object on success', async () => {
    const response = await request(app)
      .post(route)
      .set(authHeaders)
      .send({
        customer: 'Fake name',
        price: 120,
        servicesCount: [
          {
            serviceId: service.id,
            quantity: 2,
          },
        ],
        startDate: '2021-09-04',
      });

    const { id } = response.body;

    expect(response.statusCode).toBe(201);
    expect(id).toBeTruthy();

    if (id) await ordersPackRepository.destroy(id);
  });

  it('should send status 401 when authentications headers is invalid', async () => {
    const response = await request(app)
      .post(route);

    expect(response.statusCode).toBe(401);
  });
});
