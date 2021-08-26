import { ServiceType } from './ServiceType';

export type Service = {
  id?: string;
  customer?: string;
  servicesDoneIds: string[];
  servicesDone?: ServiceType[];
  date: Date;
}

export type ServiceWithPrice = Service & {
  customer: string;
  price: number;
}
