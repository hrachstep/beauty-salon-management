import { ServiceType } from '@domain/entities/ServiceType';

export interface IServiceTypeRepository {
  create(payload: ServiceType): Promise<ServiceType>;
  update(payload: ServiceType): Promise<ServiceType>;
  findAll(): Promise<ServiceType[]>;
  findById(): Promise<ServiceType>;
  findByName(name: string): Promise<ServiceType>;
}
