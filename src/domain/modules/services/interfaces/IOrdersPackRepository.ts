import { OrdersPack } from '@domain/modules/services/entities/OrdersPack';
import { FindByMonthProps } from '@shared/types/findByMonth';
import { PaginationProps } from '@shared/types/pagination';

export interface IOrdersPackRepository {
  create(payload: OrdersPack): Promise<OrdersPack>;
  update(payload: OrdersPack): Promise<OrdersPack>;
  destroy(id: string): Promise<string>;
  findAll(payload: PaginationProps): Promise<OrdersPack[]>;
  findByMonth(payload: FindByMonthProps): Promise<OrdersPack[]>;
  findById(id: string): Promise<OrdersPack>;
}
