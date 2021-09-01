import { Router } from 'express';

import { ListServiceTypesController } from '@main/controllers/listServiceTypes/ListServiceTypesController';

const listServiceTypesController = new ListServiceTypesController();
const serviceTypesRoutes = Router();

serviceTypesRoutes.get('/', listServiceTypesController.handle.bind(listServiceTypesController));

export { serviceTypesRoutes };
