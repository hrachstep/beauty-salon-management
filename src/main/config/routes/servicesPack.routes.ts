import { Router } from 'express';

import { AddServiceDoneOnServicesPackController } from '@main/controllers/addServiceDoneOnServicesPack/AddServiceDoneOnServicesPackController';
import { CreateServicesPackController } from '@main/controllers/createServicesPack/CreateServicesPackController';

import { checkErrorMiddleware } from '../middlewares/checkErrorMiddleware';

const router = Router();

const createServicesPackController = new CreateServicesPackController();
const addServiceDoneOnServicesPackController = new AddServiceDoneOnServicesPackController();

router.post('/',
  createServicesPackController.validate(),
  checkErrorMiddleware,
  createServicesPackController.handle.bind(createServicesPackController));

router.post('/:id/services',
  addServiceDoneOnServicesPackController.validate(),
  checkErrorMiddleware,
  addServiceDoneOnServicesPackController.handle.bind(addServiceDoneOnServicesPackController));

export default router;
