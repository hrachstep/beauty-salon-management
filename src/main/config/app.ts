import 'dotenv/config';
import express, { Express } from 'express';

import setupApp from './setup';

export const createApp = (): Express => {
  const app = express();

  setupApp(app);
  return app;
};
