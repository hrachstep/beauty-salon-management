import { Service } from '@domain/modules/services/entities/Service';

export interface IServiceRepository {
  create(payload: Service): Promise<Service>;
  update(payload: Service): Promise<Service>;
  destroy(id: string): Promise<string>;
  findAll(): Promise<Service[]>;
  findByMonth(date: Date): Promise<Service[]>;
  findById(id: string): Promise<Service>;
  findByIds(ids: string[]): Promise<Service[]>;
}
