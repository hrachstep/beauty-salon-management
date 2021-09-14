import { container } from 'tsyringe';

import { IServiceRepository } from '@domain/modules/services/interfaces/IServiceRepository';
import { IServicesPackRepository } from '@domain/modules/services/interfaces/IServicesPackRepository';
import { IServiceTypeRepository } from '@domain/modules/services/interfaces/IServiceTypeRepository';
import { IStorageProvider } from '@domain/modules/services/interfaces/IStorageProvider';
import { IAuthProvider } from '@domain/modules/users/interfaces/IAuthProvider';
import { FirebaseAuthProvider } from '@infrastructure/auth/FirebaseAuthProvider';
import { FirebaseStorageProvider } from '@infrastructure/providers/FirebaseStorageProvider';
import { ServiceRepository } from '@infrastructure/repositories/ServiceRepository';
import { ServicesPackRepository } from '@infrastructure/repositories/ServicesPackRepository';
import { ServiceTypeRepository } from '@infrastructure/repositories/ServiceTypeRepository';

container.registerSingleton<IServiceRepository>('ServiceRepository', ServiceRepository);
container.registerSingleton<IServiceTypeRepository>('ServiceTypeRepository', ServiceTypeRepository);
container.registerSingleton<IServicesPackRepository>('ServicesPackRepository', ServicesPackRepository);
container.registerSingleton<IStorageProvider>('StorageProvider', FirebaseStorageProvider);
container.registerSingleton<IAuthProvider>('AuthProvider', FirebaseAuthProvider);
