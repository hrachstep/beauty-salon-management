import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import ordersPackRoutes from './ordersPacks.routes';
import serviceOrdersRoutes from './serviceOrders.routes';
import servicesRoutes from './services.routes';

const router = Router();

router.use(ensureAuthenticated);
router.use('/orders-packs', ordersPackRoutes);
router.use('/services', servicesRoutes);
router.use('/service-orders', serviceOrdersRoutes);

export { router };
