import { ServicesPack } from '@domain/modules/services/entities/ServicesPack';

export interface IServicesPackRepository {
  create(payload: ServicesPack): Promise<ServicesPack>;
  update(payload: ServicesPack): Promise<ServicesPack>;
  destroy(id: string): Promise<string>;
  findAll(): Promise<ServicesPack[]>;
  findByMonth(date: Date): Promise<ServicesPack[]>;
  findById(id: string): Promise<ServicesPack>;
}
