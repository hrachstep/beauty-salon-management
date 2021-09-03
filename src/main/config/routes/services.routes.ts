import { Router } from 'express';

import { ListServiceByIdController } from '@main/controllers/listServiceById/ListServiceByIdController';
import { ListServicesController } from '@main/controllers/listServices/ListServicesController';

import { checkErrorMiddleware } from '../middlewares/checkErrorMiddleware';

const router = Router();
const listServicesControler = new ListServicesController();
const listServiceById = new ListServiceByIdController();

router.get('/',
  listServicesControler.validation(),
  checkErrorMiddleware,
  listServicesControler.handle.bind(listServicesControler));

router.get('/:id',
  listServiceById.validate(),
  checkErrorMiddleware,
  listServiceById.handle.bind(listServiceById));

export default router;
