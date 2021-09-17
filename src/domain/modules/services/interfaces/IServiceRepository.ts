import { Service } from '@domain/modules/services/entities/Service';
import { PaginationProps } from '@shared/types/pagination';

export interface IServiceRepository {
  create(payload: Service): Promise<Service>;
  update(payload: Service): Promise<Service>;
  destroy(id: string): Promise<string>;
  findAll(payload: PaginationProps): Promise<Service[]>;
  findById(id: string): Promise<Service>;
  findByIds(ids: string[]): Promise<Service[]>;
  findByName(name: string): Promise<Service>;
}
