import request from 'supertest';

import { createApp } from '@main/config/app';

describe('List Services controller', () => {
  const app = createApp();
  const route = '/services';

  it('should return status 400 if "month" is invalid', async () => {
    const response = await request(app)
      .get(`${route}?month=incorrect`);

    expect(response.statusCode).toBe(400);
  });

  it('should return status 200 on success', async () => {
    const response = await request(app)
      .get(`${route}`);

    expect(response.statusCode).toBe(200);
  });
});
