import { Router } from 'express';

import { checkErrorMiddleware } from '@main/config/middlewares/checkErrorMiddleware';
import { CreateServiceController } from '@main/controllers/modules/services/createService';
import { DeleteServiceController } from '@main/controllers/modules/services/deleteService';
import { ListServicesController } from '@main/controllers/modules/services/listServices';

const createServiceController = new CreateServiceController();
const listServicesController = new ListServicesController();
const deleteServiceController = new DeleteServiceController();

const router = Router();

router.get('/', listServicesController.handle.bind(listServicesController));

router.post('/',
  createServiceController.validate(),
  checkErrorMiddleware,
  createServiceController.handle.bind(createServiceController));

router.delete('/:id', deleteServiceController.handle.bind(deleteServiceController));

export default router;
