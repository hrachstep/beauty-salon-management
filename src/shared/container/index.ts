import { container } from 'tsyringe';

import { IOrdersPackRepository } from '@domain/modules/services/interfaces/IOrdersPackRepository';
import { IServiceOrderRepository } from '@domain/modules/services/interfaces/IServiceOrderRepository';
import { IServiceTypeRepository } from '@domain/modules/services/interfaces/IServiceTypeRepository';
import { IStorageProvider } from '@domain/modules/services/interfaces/IStorageProvider';
import { IAuthProvider } from '@domain/modules/users/interfaces/IAuthProvider';
import { FirebaseAuthProvider } from '@infrastructure/auth/FirebaseAuthProvider';
import { FirebaseStorageProvider } from '@infrastructure/providers/FirebaseStorageProvider';
import { OrdersPackRepository } from '@infrastructure/repositories/OrdersPackRepository';
import { ServiceOrderRepository } from '@infrastructure/repositories/ServiceOrderRepository';
import { ServiceTypeRepository } from '@infrastructure/repositories/ServiceTypeRepository';

container.registerSingleton<IServiceOrderRepository>('ServiceOrderRepository', ServiceOrderRepository);
container.registerSingleton<IServiceTypeRepository>('ServiceTypeRepository', ServiceTypeRepository);
container.registerSingleton<IOrdersPackRepository>('OrdersPackRepository', OrdersPackRepository);
container.registerSingleton<IStorageProvider>('StorageProvider', FirebaseStorageProvider);
container.registerSingleton<IAuthProvider>('AuthProvider', FirebaseAuthProvider);
