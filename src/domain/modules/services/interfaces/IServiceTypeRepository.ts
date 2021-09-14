import { ServiceType } from '@domain/modules/services/entities/ServiceType';

export interface IServiceTypeRepository {
  create(payload: ServiceType): Promise<ServiceType>;
  update(payload: ServiceType): Promise<ServiceType>;
  destroy(id: string): Promise<string>;
  findAll(): Promise<ServiceType[]>;
  findById(id: string): Promise<ServiceType>;
  findByIds(ids: string[]): Promise<ServiceType[]>;
  findByName(name: string): Promise<ServiceType>;
}
