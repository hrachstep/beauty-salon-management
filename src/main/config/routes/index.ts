import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import servicesRoutes from './services.routes';
import servicesPackRoutes from './servicesPack.routes';
import serviceTypesRoutes from './serviceTypes.routes';

const router = Router();

router.use(ensureAuthenticated);
router.use('/service-types', serviceTypesRoutes);
router.use('/services', servicesRoutes);
router.use('/services-packs', servicesPackRoutes);

export { router };
