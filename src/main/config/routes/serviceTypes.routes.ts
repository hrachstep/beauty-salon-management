import { Router } from 'express';

import { checkErrorMiddleware } from '@main/config/middlewares/checkErrorMiddleware';
import { CreateServiceTypeController } from '@main/controllers/createServiceType/CreateServiceTypeController';
import { ListServiceTypesController } from '@main/controllers/listServiceTypes/ListServiceTypesController';

const createServiceTypeController = new CreateServiceTypeController();
const listServiceTypesController = new ListServiceTypesController();

const serviceTypesRoutes = Router();

serviceTypesRoutes.get('/', listServiceTypesController.handle.bind(listServiceTypesController));

serviceTypesRoutes.post('/',
  createServiceTypeController.validate(),
  checkErrorMiddleware,
  createServiceTypeController.handle.bind(createServiceTypeController));

export { serviceTypesRoutes };
