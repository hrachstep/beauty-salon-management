import request from 'supertest';

import { ServicesPack } from '@domain/entities/ServicesPack';
import { ServiceType } from '@domain/entities/ServiceType';
import { ServiceRepository } from '@infrastructure/repositories/ServiceRepository';
import { ServicesPackRepository } from '@infrastructure/repositories/ServicesPackRepository';
import { ServiceTypeRepository } from '@infrastructure/repositories/ServiceTypeRepository';
import { createApp } from '@main/config/app';

describe('Add Service Done on Services Pack', () => {
  let serviceType: ServiceType;
  let pack: ServicesPack;

  const serviceTypesRepository = new ServiceTypeRepository();
  const servicesRepository = new ServiceRepository(serviceTypesRepository);
  const servicesPackRepository = new ServicesPackRepository(
    serviceTypesRepository,
    servicesRepository,
  );

  const app = createApp();
  const route = (id: string) => `/services-packs/${id}/services`;

  beforeAll(async () => {
    let response = await request(app)
      .post('/service-types')
      .send({ name: 'Fake Random Name' });

    serviceType = response.body;

    response = await request(app)
      .post('/services-packs')
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
    if (pack?.id) await servicesPackRepository.destroy(pack.id);
  });

  it('should send status 400 when "date" is invalid', async () => {
    const response = await request(app)
      .post(route(pack.id))
      .send({
        date: 'invalid date',
        servicesDoneIds: [serviceType.id],
      });

    expect(response.statusCode).toBe(400);
  });

  it('should send status 400 when "servicesDoneIds" is invalid', async () => {
    const response = await request(app)
      .post(route(pack.id))
      .send({
        date: '2021-09-04',
        servicesDoneIds: [],
      });

    expect(response.statusCode).toBe(400);
  });

  it('should send status 201 and return created object on success', async () => {
    const response = await request(app)
      .post(route(pack.id))
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
