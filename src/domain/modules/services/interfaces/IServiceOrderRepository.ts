import { ServiceOrder } from '@domain/modules/services/entities/ServiceOrder';
import { FindByMonthProps } from '@shared/types/findByMonth';
import { PaginationProps } from '@shared/types/pagination';

export interface IServiceOrderRepository {
  create(payload: ServiceOrder): Promise<ServiceOrder>;
  update(payload: ServiceOrder): Promise<ServiceOrder>;
  destroy(id: string): Promise<string>;
  findAll(pagination: PaginationProps): Promise<ServiceOrder[]>;
  findByMonth(payload: FindByMonthProps): Promise<ServiceOrder[]>;
  findById(id: string): Promise<ServiceOrder>;
  findByIds(ids: string[]): Promise<ServiceOrder[]>;
}
