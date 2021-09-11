import request from 'supertest';

import { ServiceType } from '@domain/entities/ServiceType';
import { ServiceRepository } from '@infrastructure/repositories/ServiceRepository';
import { ServiceTypeRepository } from '@infrastructure/repositories/ServiceTypeRepository';
import { createApp } from '@main/config/app';
import { authHeaders } from '@shared/tests/authHeaders';
import { mockAuthProvider } from '@shared/tests/mockAuthProvider';

mockAuthProvider();

describe('Create Service Controller', () => {
  let serviceType: ServiceType;

  const serviceTypeRepository = new ServiceTypeRepository();
  const servicesRepository = new ServiceRepository(serviceTypeRepository);

  const app = createApp();

  beforeAll(async () => {
    serviceType = await serviceTypeRepository.create({
      id: 'test-id',
      name: 'Fake Name',
    });
  });

  afterAll(async () => {
    if (serviceType.id) { await serviceTypeRepository.destroy(serviceType.id); }
  });

  it('should return status 400 if customer is empty', async () => {
    const result = await request(app)
      .post('/services')
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
      .post('/services')
      .set(authHeaders)
      .send({
        customer: 'Fake Name',
        servicesDoneIds: ['1234', '5678'],
        date: new Date(),
      });

    expect(result.statusCode).toBe(400);
  });

  it('should return status 400 if date is invalid', async () => {
    const result = await request(app)
      .post('/services')
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
      .post('/services')
      .set(authHeaders)
      .send({
        customer: 'Fake Name',
        price: 45,
        servicesDoneIds: [serviceType.id],
        date: '2021-09-03',
      });

    const { id } = result.body;

    expect(result.statusCode).toBe(201);

    await servicesRepository.destroy(id);
  });
});
