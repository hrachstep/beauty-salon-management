import { Router } from 'express';

import { serviceTypesRoutes } from './serviceTypes.routes';

const router = Router();

router.use('/service-types', serviceTypesRoutes);

export { router };
