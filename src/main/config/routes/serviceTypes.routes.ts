import { Router } from 'express';

import { checkErrorMiddleware } from '@main/config/middlewares/checkErrorMiddleware';
import { CreateServiceTypeController } from '@main/controllers/createServiceType/CreateServiceTypeController';
import { ListServiceTypesController } from '@main/controllers/listServiceTypes/ListServiceTypesController';

const createServiceTypeController = new CreateServiceTypeController();
const listServiceTypesController = new ListServiceTypesController();

const router = Router();

router.get('/', listServiceTypesController.handle.bind(listServiceTypesController));

router.post('/',
  createServiceTypeController.validate(),
  checkErrorMiddleware,
  createServiceTypeController.handle.bind(createServiceTypeController));

export default router;
