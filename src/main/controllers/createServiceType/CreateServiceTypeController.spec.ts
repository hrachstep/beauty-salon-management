import request from 'supertest';

import { ServiceTypeRepository } from '@infrastructure/repositories/ServiceTypeRepository';
import { createApp } from '@main/config/app';

jest.setTimeout(10000);

describe('Create Service Type controller', () => {
  const app = createApp();

  beforeEach(async () => {
    try {
      const repository = new ServiceTypeRepository();

      const data = await repository.findByName('Manicure');

      if (data) { await repository.destroy(data.id); }
    } catch {
      //
    }
  });

  it('should return 400 if validation fails', async () => {
    const response = await request(app)
      .post('/service-types')
      .send({
        name: '',
      });

    expect(response.status).toBe(400);
  });

  it('should return 400 when service type already exists', async () => {
    await request(app)
      .post('/service-types')
      .send({
        name: 'Manicure',
      });

    const response = await request(app)
      .post('/service-types')
      .send({
        name: 'Manicure',
      });

    expect(response.status).toBe(400);
  });

  it('should return 201 on success', async () => {
    const response = await request(app)
      .post('/service-types')
      .send({
        name: 'Manicure',
      });

    expect(response.status).toBe(201);
  });
});
