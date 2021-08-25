import { Service } from './Service';
import { ServiceType } from './ServiceType';

export type ServicesPack = {
  id?: string;
  customer: string;
  services?: Service[];
  servicesCount: {
    serviceType: ServiceType,
    quantity: number;
  }[];
  price: number;
  startDate: Date;
}
