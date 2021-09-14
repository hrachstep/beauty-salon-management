import { ServiceOrder } from '@domain/modules/services/entities/ServiceOrder';

export interface IServiceOrderRepository {
  create(payload: ServiceOrder): Promise<ServiceOrder>;
  update(payload: ServiceOrder): Promise<ServiceOrder>;
  destroy(id: string): Promise<string>;
  findAll(): Promise<ServiceOrder[]>;
  findByMonth(date: Date): Promise<ServiceOrder[]>;
  findById(id: string): Promise<ServiceOrder>;
  findByIds(ids: string[]): Promise<ServiceOrder[]>;
}
