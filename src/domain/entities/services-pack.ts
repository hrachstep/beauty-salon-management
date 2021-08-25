import { Service } from './service';
import { ServiceType } from './service-type';

export type ServicesPack = {
  id: string;
  customer: string;
  services?: Service[];
  servicesCount: {
    serviceType: ServiceType,
    quantity: number;
  }[];
  price: number;
  startDate: Date;
}
