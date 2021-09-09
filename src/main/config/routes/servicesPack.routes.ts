import { Router } from 'express';

import { AddServiceDoneOnServicesPackController } from '@main/controllers/addServiceDoneOnServicesPack/AddServiceDoneOnServicesPackController';
import { CreateServicesPackController } from '@main/controllers/createServicesPack/CreateServicesPackController';
import { DeleteServicesPackController } from '@main/controllers/deleteServicesPack/DeleteServicesPackController';
import { ListServicesPacksController } from '@main/controllers/listServicesPacks/ListServicesPacksController';
import { UploadImageController } from '@main/controllers/uploadImage/UploadImageController';

import { checkErrorMiddleware } from '../middlewares/checkErrorMiddleware';
import { deleteUploadedFileOnRequestError } from '../middlewares/deleteUploadedFileOnRequestError';
import uploadImageMiddleware from '../middlewares/uploadImageMiddleware';

const router = Router();

const createServicesPackController = new CreateServicesPackController();
const addServiceDoneOnServicesPackController = new AddServiceDoneOnServicesPackController();
const listServicesPacksController = new ListServicesPacksController();
const deleteServicesPackController = new DeleteServicesPackController();
const uploadImageController = new UploadImageController();

router.get('/',
  listServicesPacksController.validate(),
  checkErrorMiddleware,
  listServicesPacksController.handle.bind(listServicesPacksController));

router.post('/',
  createServicesPackController.validate(),
  checkErrorMiddleware,
  createServicesPackController.handle.bind(createServicesPackController));

router.post('/:id/services',
  uploadImageMiddleware.single('image'),
  addServiceDoneOnServicesPackController.validate(),
  checkErrorMiddleware,
  uploadImageController.handle.bind(uploadImageController),
  addServiceDoneOnServicesPackController.handle.bind(addServiceDoneOnServicesPackController),
  deleteUploadedFileOnRequestError);

router.delete('/:id', deleteServicesPackController.handle.bind(deleteServicesPackController));

export default router;
