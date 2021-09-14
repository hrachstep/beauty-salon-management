import { Service } from './Service';
import { ServiceOrder } from './ServiceOrder';

export type OrdersPack = {
  id?: string;
  customer: string;
  serviceOrders?: ServiceOrder[];
  serviceOrdersId?: string[];
  servicesCount: {
    service?: Service;
    serviceId: string;
    quantity: number;
  }[];
  price: number;
  startDate: Date;
}
