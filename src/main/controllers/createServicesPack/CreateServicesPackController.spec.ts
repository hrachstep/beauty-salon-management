import request from 'supertest';

import { ServiceType } from '@domain/entities/ServiceType';
import { ServiceRepository } from '@infrastructure/repositories/ServiceRepository';
import { ServicesPackRepository } from '@infrastructure/repositories/ServicesPackRepository';
import { ServiceTypeRepository } from '@infrastructure/repositories/ServiceTypeRepository';
import { createApp } from '@main/config/app';
import { authHeaders } from '@shared/tests/authHeaders';
import { mockAuthProvider } from '@shared/tests/mockAuthProvider';

mockAuthProvider();

describe('Create Services Pack', () => {
  const serviceTypesRepository = new ServiceTypeRepository();
  const servicesRepository = new ServiceRepository(serviceTypesRepository);
  const servicesPackRepository = new ServicesPackRepository(
    serviceTypesRepository,
    servicesRepository,
  );

  let serviceType: ServiceType;
  const app = createApp();
  const route = '/services-packs';

  beforeAll(async () => {
    serviceType = await serviceTypesRepository.create({
      id: 'test-id',
      name: 'Fake Name',
    });
  });

  afterAll(async () => {
    if (serviceType.id) { await serviceTypesRepository.destroy(serviceType.id); }
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

  it('should send status 400 if "servicesCont" isnt a array of object with "count" and "serviceTypeId" valid props', async () => {
    const response = await request(app)
      .post(route)
      .set(authHeaders)
      .send({
        customer: 'Fake name',
        price: 45,
        servicesCount: [
          {
            serviceTypeId: '',
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
            serviceTypeId: serviceType.id,
            quantity: 2,
          },
        ],
        startDate: '2021-09-04',
      });

    const { id } = response.body;

    expect(response.statusCode).toBe(201);
    expect(id).toBeTruthy();

    if (id) await servicesPackRepository.destroy(id);
  });

  it('should send status 401 when authentications headers is invalid', async () => {
    const response = await request(app)
      .post(route);

    expect(response.statusCode).toBe(401);
  });
});
