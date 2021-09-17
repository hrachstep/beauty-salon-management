import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  setDoc,
  startAt,
  where,
} from 'firebase/firestore';
import { inject, injectable } from 'tsyringe';

import { ServiceOrder } from '@domain/modules/services/entities/ServiceOrder';
import { IServiceOrderRepository } from '@domain/modules/services/interfaces/IServiceOrderRepository';
import { IServiceRepository } from '@domain/modules/services/interfaces/IServiceRepository';
import { FindByMonthProps } from '@shared/types/findByMonth';
import { PaginationProps } from '@shared/types/pagination';

import { Firebase } from '../shared/Firebase';

@injectable()
export class ServiceOrderRepository implements IServiceOrderRepository {
  readonly db: Firestore;
  readonly tableName: string;
  readonly table: CollectionReference;

  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,
  ) {
    this.db = Firebase.database;
    this.tableName = 'service-orders';
    this.table = collection(this.db, this.tableName);
  }

  async create({
    id,
    customer,
    servicesDoneId,
    price,
    date,
    isFromPack,
    image,
  }: ServiceOrder): Promise<ServiceOrder> {
    await setDoc(doc(this.table, id), {
      id,
      customer,
      servicesDoneId,
      price,
      date,
      isFromPack,
      image,
    });

    return {
      id,
      customer,
      servicesDoneId,
      servicesDone: await this.serviceRepository.findByIds(servicesDoneId),
      price,
      date,
      isFromPack,
      image,
    };
  }

  async update({
    id,
    customer,
    servicesDoneId,
    price,
    date,
    isFromPack,
    image,
  }: ServiceOrder): Promise<ServiceOrder> {
    await setDoc(doc(this.table, id), {
      id,
      customer,
      servicesDoneId,
      price,
      date,
      isFromPack,
      image,
    });

    return {
      id,
      customer,
      servicesDoneId,
      servicesDone: await this.serviceRepository.findByIds(servicesDoneId),
      price,
      date,
      isFromPack,
      image,
    };
  }

  async destroy(id: string): Promise<string> {
    await deleteDoc(doc(this.table, id));
    return id;
  }

  private async getServiceData(
    snapshot: QueryDocumentSnapshot<DocumentData>,
  ): Promise<ServiceOrder> {
    const data = snapshot.data();

    const servicesDone = await this.serviceRepository.findByIds(data.servicesDoneId);

    return {
      ...data,
      servicesDone,
    } as ServiceOrder;
  }

  private async convertSnapshotToServiceList(items: QuerySnapshot<DocumentData>) {
    return Promise.all(
      items.docs.map(async (item) => this.getServiceData(item)),
    );
  }

  async findAll({ page, limit: pageSize }: PaginationProps): Promise<ServiceOrder[]> {
    const offsetSize = pageSize * (page - 1) + 1;

    const allDocs = await getDocs(
      query(
        this.table,
        limit(offsetSize),
      ),
    );

    if (!allDocs.docs?.length || allDocs.docs?.length < offsetSize) return [];

    const lastVisible = allDocs.docs[allDocs.docs.length - 1];

    const snapshot = await getDocs(
      query(
        this.table,
        startAt(lastVisible),
        limit(pageSize),
      ),
    );

    if (snapshot.empty) return [];

    return this.convertSnapshotToServiceList(snapshot);
  }

  async findByIds(ids: string[]): Promise<ServiceOrder[]> {
    const snapshot = await getDocs(query(this.table, where('id', 'in', ids)));

    if (snapshot.empty) return [];

    return this.convertSnapshotToServiceList(snapshot);
  }

  async findByMonth({
    page,
    month: date,
    limit: pageSize,
  }: FindByMonthProps): Promise<ServiceOrder[]> {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const offsetSize = pageSize * (page - 1) + 1;

    const allDocs = await getDocs(
      query(
        this.table,
        where('date', '>=', firstDay),
        where('date', '<=', lastDay),
        limit(offsetSize),
      ),
    );

    if (!allDocs.docs?.length || allDocs.docs?.length < offsetSize) return [];

    const lastVisible = allDocs.docs[allDocs.docs.length - 1];

    const snapshot = await getDocs(
      query(
        this.table,
        where('date', '>=', firstDay),
        where('date', '<=', lastDay),
        startAt(lastVisible),
        limit(pageSize),
      ),
    );

    if (snapshot.empty) return [];

    return this.convertSnapshotToServiceList(snapshot);
  }

  async findById(id: string): Promise<ServiceOrder> {
    const snapshot = await getDoc(doc(this.table, id));

    if (!snapshot.exists()) return null;

    return this.getServiceData(snapshot);
  }
}
