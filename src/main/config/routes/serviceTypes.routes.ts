import { Router } from 'express';

import { checkErrorMiddleware } from '@main/config/middlewares/checkErrorMiddleware';
import { CreateServiceTypeController } from '@main/controllers/createServiceType/CreateServiceTypeController';
import { DeleteServiceTypeController } from '@main/controllers/deleteServiceType/DeleteServiceTypeController';
import { ListServiceTypesController } from '@main/controllers/listServiceTypes/ListServiceTypesController';

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
