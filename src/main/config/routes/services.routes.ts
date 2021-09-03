import { Router } from 'express';

import { ListServicesController } from '@main/controllers/listServices/ListServicesController';

import { checkErrorMiddleware } from '../middlewares/checkErrorMiddleware';

const router = Router();
const listServicesControler = new ListServicesController();

router.get('/',
  listServicesControler.validation(),
  checkErrorMiddleware,
  listServicesControler.handle.bind(listServicesControler));

export default router;
