import 'express-async-errors';
import express, { Express } from 'express';

import { errorMiddleware } from './middlewares/errorMiddleware';
import { router } from './routes';

export default function setup(app: Express): void {
  app.use(express.json());
  app.use(router);
  app.use(errorMiddleware);
}
