import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import serviceOrdersRoutes from './serviceOrders.routes';
import servicesPackRoutes from './servicesPack.routes';
import serviceTypesRoutes from './serviceTypes.routes';

const router = Router();

router.use(ensureAuthenticated);
router.use('/service-types', serviceTypesRoutes);
router.use('/service-orders', serviceOrdersRoutes);
router.use('/services-packs', servicesPackRoutes);

export { router };
