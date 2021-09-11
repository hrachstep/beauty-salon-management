import request from 'supertest';

import { createApp } from '@main/config/app';
import { authHeaders } from '@shared/tests/authHeaders';
import { mockAuthProvider } from '@shared/tests/mockAuthProvider';

mockAuthProvider();

describe('Delete Service Type controller', () => {
  const app = createApp();
  const id = '1234';

  it('should send status 204 with no response', async () => {
    const response = await request(app)
      .delete(`/service-types/${id}`)
      .set(authHeaders);

    expect(response.statusCode).toBe(204);
  });

  it('should send status 401 when authentications headers is invalid', async () => {
    const response = await request(app)
      .delete(`/service-types/${id}`);

    expect(response.statusCode).toBe(401);
  });
});
