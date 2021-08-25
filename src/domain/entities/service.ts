import ServiceType from './service-type';

type Service = {
  id: string;
  customer: string;
  price: string;
  servicesDone: ServiceType[];
  date: Date;
}

export default Service;
