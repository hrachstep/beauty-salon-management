import { Router } from 'express';

import { CreateServiceOrderController } from '@main/controllers/modules/services/createServiceOrder';
import { DeleteServiceOrderController } from '@main/controllers/modules/services/deleteServiceOrder';
import { ListServiceByIdController } from '@main/controllers/modules/services/listServiceOrderById';
import { ListServiceOrdersController } from '@main/controllers/modules/services/listServiceOrders';
import { UploadImageController } from '@main/controllers/modules/services/uploadImage/UploadImageController';

import { checkErrorMiddleware } from '../middlewares/checkErrorMiddleware';
import { deleteUploadedFileOnRequestError } from '../middlewares/deleteUploadedFileOnRequestError';
import uploadImageMiddleware from '../middlewares/uploadImageMiddleware';

const router = Router();

const listServiceOrdersControler = new ListServiceOrdersController();
const listServiceOrderByIdController = new ListServiceByIdController();
const createServiceOrderController = new CreateServiceOrderController();
const deleteServiceOrderController = new DeleteServiceOrderController();
const uploadImageController = new UploadImageController();

router.get('/',
  listServiceOrdersControler.validation(),
  checkErrorMiddleware,
  listServiceOrdersControler.handle.bind(listServiceOrdersControler));

router.get('/:id',
  listServiceOrderByIdController.validate(),
  checkErrorMiddleware,
  listServiceOrderByIdController.handle.bind(listServiceOrderByIdController));

router.post('/',
  uploadImageMiddleware.single('image'),
  createServiceOrderController.validate(),
  checkErrorMiddleware,
  uploadImageController.handle.bind(uploadImageController),
  createServiceOrderController.handle.bind(createServiceOrderController),
  deleteUploadedFileOnRequestError);

router.delete('/:id', deleteServiceOrderController.handle.bind(deleteServiceOrderController));

export default router;
