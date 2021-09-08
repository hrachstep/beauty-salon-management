import { container } from 'tsyringe';

import { IServiceRepository } from '@domain/interfaces/IServiceRepository';
import { IServicesPackRepository } from '@domain/interfaces/IServicesPackRepository';
import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';
import { ServiceRepository } from '@infrastructure/repositories/ServiceRepository';
import { ServicesPackRepository } from '@infrastructure/repositories/ServicesPackRepository';
import { ServiceTypeRepository } from '@infrastructure/repositories/ServiceTypeRepository';

container.registerSingleton<IServiceRepository>('ServiceRepository', ServiceRepository);
container.registerSingleton<IServiceTypeRepository>('ServiceTypeRepository', ServiceTypeRepository);
container.registerSingleton<IServicesPackRepository>('ServicesPackRepository', ServicesPackRepository);
