import { Service } from '@domain/entities/Service';

export interface IServiceRepository {
  create(payload: Service): Promise<Service>;
  update(payload: Service): Promise<Service>;
  delete(id: string): Promise<string>;
  findAll(): Promise<Service[]>;
  findByMonth(date: Date): Promise<Service[]>;
  findById(id: string): Promise<Service>;
}
