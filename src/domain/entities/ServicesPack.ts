import { Service } from './Service';
import { ServiceType } from './ServiceType';

export type ServicesPack = {
  id?: string;
  customer: string;
  services?: Service[];
  servicesId?: string[];
  servicesCount: {
    serviceType?: ServiceType;
    serviceTypeId: string;
    quantity: number;
  }[];
  price: number;
  startDate: Date;
}
