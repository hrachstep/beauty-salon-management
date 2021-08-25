import { ServiceType } from './ServiceType';

export type Service = {
  id?: string;
  customer: string;
  servicesDone: ServiceType[];
  date: Date;
}

export type ServiceWithPrice = Service & {
  price: number;
}