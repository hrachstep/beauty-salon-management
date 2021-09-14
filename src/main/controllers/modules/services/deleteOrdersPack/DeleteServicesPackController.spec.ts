import request from 'supertest';

import { createApp } from '@main/config/app';
import { authHeaders } from '@shared/tests/authHeaders';
import { mockAuthProvider } from '@shared/tests/mockAuthProvider';

mockAuthProvider();

describe('Delete Orders Pack controller', () => {
  const app = createApp();
  const id = '1234';

  it('should send status 204 with no response', async () => {
    const response = await request(app)
      .delete(`/orders-packs/${id}`)
      .set(authHeaders);

    expect(response.statusCode).toBe(204);
  });
});
