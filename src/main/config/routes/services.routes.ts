import { Router } from 'express';

import { CreateServiceController } from '@main/controllers/createService/CreateServiceController';
import { ListServiceByIdController } from '@main/controllers/listServiceById/ListServiceByIdController';
import { ListServicesController } from '@main/controllers/listServices/ListServicesController';

import { checkErrorMiddleware } from '../middlewares/checkErrorMiddleware';

const router = Router();

const listServicesControler = new ListServicesController();
const listServiceByIdController = new ListServiceByIdController();
const createServiceController = new CreateServiceController();

router.get('/',
  listServicesControler.validation(),
  checkErrorMiddleware,
  listServicesControler.handle.bind(listServicesControler));

router.get('/:id',
  listServiceByIdController.validate(),
  checkErrorMiddleware,
  listServiceByIdController.handle.bind(listServiceByIdController));

router.post('/',
  createServiceController.validate(),
  checkErrorMiddleware,
  createServiceController.handle.bind(createServiceController));

export default router;
