import request from 'supertest';

import { createApp } from '@main/config/app';

describe('Delete Service controller', () => {
  const app = createApp();
  const id = '1234';

  it('should send status 204 with no response', async () => {
    const response = await request(app)
      .delete(`/services/${id}`);

    expect(response.statusCode).toBe(204);
  });
});
