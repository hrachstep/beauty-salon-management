import { ServiceType } from './ServiceType';

export type Service = {
  id?: string;
  customer?: string;
  servicesDoneIds: string[];
  servicesDone?: ServiceType[];
  date: Date;
  price?: number;
  isFromPack?: boolean;
  image?: string;
}
