import { container } from 'tsyringe';

import { IAuthProvider } from '@domain/interfaces/IAuthProvider';
import { IServiceRepository } from '@domain/interfaces/IServiceRepository';
import { IServicesPackRepository } from '@domain/interfaces/IServicesPackRepository';
import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';
import { IStorageProvider } from '@domain/interfaces/IStorageProvider';
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
