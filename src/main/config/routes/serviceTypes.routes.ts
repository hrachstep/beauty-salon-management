import { Router } from 'express';

import { checkErrorMiddleware } from '@main/config/middlewares/checkErrorMiddleware';
import { CreateServiceTypeController } from '@main/controllers/modules/services/createServiceType/CreateServiceTypeController';
import { DeleteServiceTypeController } from '@main/controllers/modules/services/deleteServiceType/DeleteServiceTypeController';
import { ListServiceTypesController } from '@main/controllers/modules/services/listServiceTypes/ListServiceTypesController';

const createServiceTypeController = new CreateServiceTypeController();
const listServiceTypesController = new ListServiceTypesController();
const deleteServiceTypeController = new DeleteServiceTypeController();

const router = Router();

router.get('/', listServiceTypesController.handle.bind(listServiceTypesController));

router.post('/',
  createServiceTypeController.validate(),
  checkErrorMiddleware,
  createServiceTypeController.handle.bind(createServiceTypeController));

router.delete('/:id', deleteServiceTypeController.handle.bind(deleteServiceTypeController));

export default router;
