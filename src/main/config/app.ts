import 'reflect-metadata';
import 'dotenv/config';
import '@shared/container';

import express, { Express } from 'express';

import setupApp from './setup';

export const createApp = (): Express => {
  const app = express();

  setupApp(app);
  return app;
};
