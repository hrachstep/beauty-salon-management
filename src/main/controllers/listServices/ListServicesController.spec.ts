import request from 'supertest';

import { createApp } from '@main/config/app';
import { authHeaders } from '@shared/tests/authHeaders';
import { mockAuthProvider } from '@shared/tests/mockAuthProvider';

mockAuthProvider();

describe('List Services controller', () => {
  const app = createApp();
  const route = '/services';

  it('should return status 400 if "month" is invalid', async () => {
    const response = await request(app)
      .get(`${route}?month=incorrect`)
      .set(authHeaders);

    expect(response.statusCode).toBe(400);
  });

  it('should return status 200 on success', async () => {
    const response = await request(app)
      .get(`${route}`)
      .set(authHeaders);

    expect(response.statusCode).toBe(200);
  });
});
