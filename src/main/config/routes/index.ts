import { Router } from 'express';

import servicesRoutes from './services.routes';
import servicesPackRoutes from './servicesPack.routes';
import serviceTypesRoutes from './serviceTypes.routes';

const router = Router();

router.use('/service-types', serviceTypesRoutes);
router.use('/services', servicesRoutes);
router.use('/services-packs', servicesPackRoutes);

export { router };
