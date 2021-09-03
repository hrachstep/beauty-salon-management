import request from 'supertest';

import { createApp } from '@main/config/app';

describe('List Services controller', () => {
  const app = createApp();

  it('should return a list of services done', async () => {
    const response = await request(app).get('/services');

    expect(response.status).toBe(200);
    console.log(response.body);
    expect(response.body).toBeInstanceOf([]);
  });
});
