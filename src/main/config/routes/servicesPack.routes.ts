import { Router } from 'express';

import { AddServiceDoneOnServicesPackController } from '@main/controllers/addServiceDoneOnServicesPack/AddServiceDoneOnServicesPackController';
import { CreateServicesPackController } from '@main/controllers/createServicesPack/CreateServicesPackController';
import { DeleteServicesPackController } from '@main/controllers/deleteServicesPack/DeleteServicesPackController';
import { ListServicesPacksController } from '@main/controllers/listServicesPacks/ListServicesPacksController';

import { checkErrorMiddleware } from '../middlewares/checkErrorMiddleware';

const router = Router();

const createServicesPackController = new CreateServicesPackController();
const addServiceDoneOnServicesPackController = new AddServiceDoneOnServicesPackController();
const listServicesPacksController = new ListServicesPacksController();
const deleteServicesPackController = new DeleteServicesPackController();

router.get('/',
  listServicesPacksController.validate(),
  checkErrorMiddleware,
  listServicesPacksController.handle.bind(listServicesPacksController));

router.post('/',
  createServicesPackController.validate(),
  checkErrorMiddleware,
  createServicesPackController.handle.bind(createServicesPackController));

router.post('/:id/services',
  addServiceDoneOnServicesPackController.validate(),
  checkErrorMiddleware,
  addServiceDoneOnServicesPackController.handle.bind(addServiceDoneOnServicesPackController));

router.delete('/:id', deleteServicesPackController.handle.bind(deleteServicesPackController));

export default router;
