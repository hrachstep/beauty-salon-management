import { Router } from 'express';

import { AddServiceOrderOnOrdersPackController } from '@main/controllers/modules/services/addServiceOrderOnOrdersPack';
import { CreateOrdersPackController } from '@main/controllers/modules/services/createOrdersPack';
import { DeleteOrdersPackController } from '@main/controllers/modules/services/deleteOrdersPack';
import { ListOrdersPacksController } from '@main/controllers/modules/services/listOrdersPacks';
import { UploadImageController } from '@main/controllers/modules/services/uploadImage/UploadImageController';

import { checkErrorMiddleware } from '../middlewares/checkErrorMiddleware';
import { deleteUploadedFileOnRequestError } from '../middlewares/deleteUploadedFileOnRequestError';
import uploadImageMiddleware from '../middlewares/uploadImageMiddleware';

const router = Router();

const createOrdersPackController = new CreateOrdersPackController();
const addServiceOrderOnOrdersPackController = new AddServiceOrderOnOrdersPackController();
const listOrdersPacksController = new ListOrdersPacksController();
const deleteOrdersPackController = new DeleteOrdersPackController();
const uploadImageController = new UploadImageController();

router.get('/',
  listOrdersPacksController.validate(),
  checkErrorMiddleware,
  listOrdersPacksController.handle.bind(listOrdersPacksController));

router.post('/',
  createOrdersPackController.validate(),
  checkErrorMiddleware,
  createOrdersPackController.handle.bind(createOrdersPackController));

router.post('/:id/orders',
  uploadImageMiddleware.single('image'),
  addServiceOrderOnOrdersPackController.validate(),
  checkErrorMiddleware,
  uploadImageController.handle.bind(uploadImageController),
  addServiceOrderOnOrdersPackController.handle.bind(addServiceOrderOnOrdersPackController),
  deleteUploadedFileOnRequestError);

router.delete('/:id', deleteOrdersPackController.handle.bind(deleteOrdersPackController));

export default router;
