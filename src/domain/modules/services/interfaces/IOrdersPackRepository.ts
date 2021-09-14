import { OrdersPack } from '@domain/modules/services/entities/OrdersPack';

export interface IOrdersPackRepository {
  create(payload: OrdersPack): Promise<OrdersPack>;
  update(payload: OrdersPack): Promise<OrdersPack>;
  destroy(id: string): Promise<string>;
  findAll(): Promise<OrdersPack[]>;
  findByMonth(date: Date): Promise<OrdersPack[]>;
  findById(id: string): Promise<OrdersPack>;
}
