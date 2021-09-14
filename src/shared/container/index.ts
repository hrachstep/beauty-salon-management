import { container } from 'tsyringe';

import { IOrdersPackRepository } from '@domain/modules/services/interfaces/IOrdersPackRepository';
import { IServiceOrderRepository } from '@domain/modules/services/interfaces/IServiceOrderRepository';
import { IServiceRepository } from '@domain/modules/services/interfaces/IServiceRepository';
import { IStorageProvider } from '@domain/modules/services/interfaces/IStorageProvider';
import { IAuthProvider } from '@domain/modules/users/interfaces/IAuthProvider';
import { FirebaseAuthProvider } from '@infrastructure/auth/FirebaseAuthProvider';
import { FirebaseStorageProvider } from '@infrastructure/providers/FirebaseStorageProvider';
import { OrdersPackRepository } from '@infrastructure/repositories/OrdersPackRepository';
import { ServiceOrderRepository } from '@infrastructure/repositories/ServiceOrderRepository';
import { ServiceRepository } from '@infrastructure/repositories/ServiceRepository';

container.registerSingleton<IServiceOrderRepository>('ServiceOrderRepository', ServiceOrderRepository);
container.registerSingleton<IServiceRepository>('ServiceRepository', ServiceRepository);
container.registerSingleton<IOrdersPackRepository>('OrdersPackRepository', OrdersPackRepository);
container.registerSingleton<IStorageProvider>('StorageProvider', FirebaseStorageProvider);
container.registerSingleton<IAuthProvider>('AuthProvider', FirebaseAuthProvider);
