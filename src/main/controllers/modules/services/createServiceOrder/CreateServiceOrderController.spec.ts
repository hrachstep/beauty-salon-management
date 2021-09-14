import request from 'supertest';

import { Service } from '@domain/modules/services/entities/Service';
import { ServiceOrderRepository } from '@infrastructure/repositories/ServiceOrderRepository';
import { ServiceRepository } from '@infrastructure/repositories/ServiceRepository';
import { createApp } from '@main/config/app';
import { authHeaders } from '@shared/tests/authHeaders';
import { mockAuthProvider } from '@shared/tests/mockAuthProvider';

mockAuthProvider();

describe('Create Service Order Controller', () => {
  let service: Service;

  const serviceRepository = new ServiceRepository();
  const serviceOrdersRepository = new ServiceOrderRepository(serviceRepository);

  const app = createApp();
  const route = '/service-orders';

  beforeAll(async () => {
    service = await serviceRepository.create({
      id: 'test-id',
      name: 'Fake Name',
    });
  });

  afterAll(async () => {
    if (service.id) { await serviceRepository.destroy(service.id); }
  });

  it('should return status 400 if customer is empty', async () => {
    const result = await request(app)
      .post(route)
      .set(authHeaders)
      .send({
        price: 45,
        servicesDoneIds: ['1234', '5678'],
        date: new Date(),
      });

    expect(result.statusCode).toBe(400);
  });

  it('should return status 400 if price is empty or not numeric', async () => {
    const result = await request(app)
      .post(route)
      .set(authHeaders)
      .send({
        customer: 'Fake Name',
        servicesDoneIds: ['1234', '5678'],
        date: new Date(),
      });

    expect(result.statusCode).toBe(400);
  });

  it('should send status 401 when authentications headers is invalid', async () => {
    const response = await request(app)
      .post(route)
      .send({
        customer: 'Fake Name',
        servicesDoneIds: ['1234', '5678'],
        date: new Date(),
      });

    expect(response.statusCode).toBe(401);
  });

  it('should return status 400 if date is invalid', async () => {
    const result = await request(app)
      .post(route)
      .set(authHeaders)
      .send({
        customer: 'Fake Name',
        price: 45,
        servicesDoneIds: ['1234', '5678'],
        date: 'teste',
      });

    expect(result.statusCode).toBe(400);
  });

  it('should return status 201 on success', async () => {
    const result = await request(app)
      .post(route)
      .set(authHeaders)
      .send({
        customer: 'Fake Name',
        price: 45,
        servicesDoneIds: [service.id],
        date: '2021-09-03',
      });

    const { id } = result.body;

    expect(result.statusCode).toBe(201);

    await serviceOrdersRepository.destroy(id);
  });
});
