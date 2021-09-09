import { Router } from 'express';

import { CreateServiceController } from '@main/controllers/createService/CreateServiceController';
import { DeleteServiceController } from '@main/controllers/deleteService/DeleteServiceController';
import { ListServiceByIdController } from '@main/controllers/listServiceById/ListServiceByIdController';
import { ListServicesController } from '@main/controllers/listServices/ListServicesController';
import { UploadImageController } from '@main/controllers/uploadImage/UploadImageController';

import { checkErrorMiddleware } from '../middlewares/checkErrorMiddleware';
import { deleteUploadedFileOnRequestError } from '../middlewares/deleteUploadedFileOnRequestError';
import uploadImageMiddleware from '../middlewares/uploadImageMiddleware';

const router = Router();

const listServicesControler = new ListServicesController();
const listServiceByIdController = new ListServiceByIdController();
const createServiceController = new CreateServiceController();
const deleteServiceController = new DeleteServiceController();
const uploadImageController = new UploadImageController();

router.get('/',
  listServicesControler.validation(),
  checkErrorMiddleware,
  listServicesControler.handle.bind(listServicesControler));

router.get('/:id',
  listServiceByIdController.validate(),
  checkErrorMiddleware,
  listServiceByIdController.handle.bind(listServiceByIdController));

router.post('/',
  uploadImageMiddleware.single('image'),
  createServiceController.validate(),
  checkErrorMiddleware,
  uploadImageController.handle.bind(uploadImageController),
  createServiceController.handle.bind(createServiceController),
  deleteUploadedFileOnRequestError);

router.delete('/:id', deleteServiceController.handle.bind(deleteServiceController));

export default router;
