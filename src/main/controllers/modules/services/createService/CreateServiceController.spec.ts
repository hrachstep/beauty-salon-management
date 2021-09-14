import request from 'supertest';

import { ServiceRepository } from '@infrastructure/repositories/ServiceRepository';
import { createApp } from '@main/config/app';
import { authHeaders } from '@shared/tests/authHeaders';
import { mockAuthProvider } from '@shared/tests/mockAuthProvider';

jest.setTimeout(10000);

mockAuthProvider();

describe('Create Service controller', () => {
  const app = createApp();
  const route = '/services';

  beforeEach(async () => {
    try {
      const repository = new ServiceRepository();

      const data = await repository.findByName('Manicure');

      if (data) { await repository.destroy(data.id); }
    } catch {
      //
    }
  });

  it('should return 400 if validation fails', async () => {
    const response = await request(app)
      .post(route)
      .set(authHeaders)
      .send({
        name: '',
      });

    expect(response.status).toBe(400);
  });

  it('should return 400 when service type already exists', async () => {
    await request(app)
      .post(route)
      .set(authHeaders)
      .send({
        name: 'Manicure',
      });

    const response = await request(app)
      .post(route)
      .set(authHeaders)
      .send({
        name: 'Manicure',
      });

    expect(response.status).toBe(400);
  });

  it('should return 201 on success', async () => {
    const response = await request(app)
      .post(route)
      .set(authHeaders)
      .send({
        name: 'Manicure',
      });

    expect(response.status).toBe(201);
  });

  it('should send status 401 when authentications headers is invalid', async () => {
    const response = await request(app)
      .post(route);

    expect(response.statusCode).toBe(401);
  });
});
