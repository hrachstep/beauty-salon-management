import { Router } from 'express';

import { CreateServicesPackController } from '@main/controllers/createServicesPack/CreateServicesPackController';

import { checkErrorMiddleware } from '../middlewares/checkErrorMiddleware';

const router = Router();

const createServicesPackController = new CreateServicesPackController();

router.post('/',
  createServicesPackController.validate(),
  checkErrorMiddleware,
  createServicesPackController.handle.bind(createServicesPackController));

export default router;
