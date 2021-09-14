import { ServiceOrder } from './ServiceOrder';
import { ServiceType } from './ServiceType';

export type OrdersPack = {
  id?: string;
  customer: string;
  services?: ServiceOrder[];
  servicesId?: string[];
  servicesCount: {
    serviceType?: ServiceType;
    serviceTypeId: string;
    quantity: number;
  }[];
  price: number;
  startDate: Date;
}
