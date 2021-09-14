import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import ordersPackRoutes from './ordersPack.routes';
import serviceOrdersRoutes from './serviceOrders.routes';
import serviceTypesRoutes from './serviceTypes.routes';

const router = Router();

router.use(ensureAuthenticated);
router.use('/service-types', serviceTypesRoutes);
router.use('/service-orders', serviceOrdersRoutes);
router.use('/orders-packs', ordersPackRoutes);

export { router };
