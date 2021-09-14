import { Service } from '@domain/modules/services/entities/Service';

export interface IServiceRepository {
  create(payload: Service): Promise<Service>;
  update(payload: Service): Promise<Service>;
  destroy(id: string): Promise<string>;
  findAll(): Promise<Service[]>;
  findById(id: string): Promise<Service>;
  findByIds(ids: string[]): Promise<Service[]>;
  findByName(name: string): Promise<Service>;
}
