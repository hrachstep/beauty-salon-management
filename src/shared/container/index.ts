import { container } from 'tsyringe';

import { IServiceOrderRepository } from '@domain/modules/services/interfaces/IServiceOrderRepository';
import { IServicesPackRepository } from '@domain/modules/services/interfaces/IServicesPackRepository';
import { IServiceTypeRepository } from '@domain/modules/services/interfaces/IServiceTypeRepository';
import { IStorageProvider } from '@domain/modules/services/interfaces/IStorageProvider';
import { IAuthProvider } from '@domain/modules/users/interfaces/IAuthProvider';
import { FirebaseAuthProvider } from '@infrastructure/auth/FirebaseAuthProvider';
import { FirebaseStorageProvider } from '@infrastructure/providers/FirebaseStorageProvider';
import { ServiceOrderRepository } from '@infrastructure/repositories/ServiceOrderRepository';
import { ServicesPackRepository } from '@infrastructure/repositories/ServicesPackRepository';
import { ServiceTypeRepository } from '@infrastructure/repositories/ServiceTypeRepository';

container.registerSingleton<IServiceOrderRepository>('ServiceOrderRepository', ServiceOrderRepository);
container.registerSingleton<IServiceTypeRepository>('ServiceTypeRepository', ServiceTypeRepository);
container.registerSingleton<IServicesPackRepository>('ServicesPackRepository', ServicesPackRepository);
container.registerSingleton<IStorageProvider>('StorageProvider', FirebaseStorageProvider);
container.registerSingleton<IAuthProvider>('AuthProvider', FirebaseAuthProvider);
