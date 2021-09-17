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

import { OrdersPack } from '@domain/modules/services/entities/OrdersPack';
import { IOrdersPackRepository } from '@domain/modules/services/interfaces/IOrdersPackRepository';
import { IServiceOrderRepository } from '@domain/modules/services/interfaces/IServiceOrderRepository';
import { IServiceRepository } from '@domain/modules/services/interfaces/IServiceRepository';
import { FindByMonthProps } from '@shared/types/findByMonth';
import { PaginationProps } from '@shared/types/pagination';

import { Firebase } from '../shared/Firebase';

@injectable()
export class OrdersPackRepository implements IOrdersPackRepository {
  readonly db: Firestore;
  readonly tableName: string;
  readonly table: CollectionReference;

  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,

    @inject('ServiceOrderRepository')
    private serviceOrderRepository: IServiceOrderRepository,
  ) {
    this.db = Firebase.database;
    this.tableName = 'orders-packs';
    this.table = collection(this.db, this.tableName);
  }

  async create({
    id,
    customer,
    startDate,
    servicesCount,
    serviceOrdersId,
    price,
  }: OrdersPack): Promise<OrdersPack> {
    await setDoc(doc(this.table, id), {
      id,
      customer,
      price,
      startDate,
      servicesCount,
      serviceOrdersId,
    });

    return {
      id,
      customer,
      price,
      startDate,
      servicesCount,
      serviceOrdersId,
      serviceOrders: [],
    };
  }

  async update({
    customer,
    price,
    servicesCount,
    startDate,
    id,
    serviceOrdersId,
    serviceOrders,
  }: OrdersPack): Promise<OrdersPack> {
    await setDoc(doc(this.table, id), {
      id,
      customer,
      price,
      startDate,
      servicesCount,
      serviceOrdersId,
    });

    return {
      id,
      customer,
      price,
      startDate,
      servicesCount,
      serviceOrders,
      serviceOrdersId,
    };
  }

  async destroy(id: string): Promise<string> {
    await deleteDoc(doc(this.table, id));
    return id;
  }

  async findAll({ page, limit: pageSize }: PaginationProps): Promise<OrdersPack[]> {
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

    return this.convertSnapshotToPackList(snapshot);
  }

  async findByMonth({
    page,
    month: date,
    limit: pageSize,
  }: FindByMonthProps): Promise<OrdersPack[]> {
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

    return this.convertSnapshotToPackList(snapshot);
  }

  async findById(id: string): Promise<OrdersPack> {
    const snapshot = await getDoc(doc(this.table, id));

    if (!snapshot.exists()) return null;

    return this.getOrdersPackData(snapshot);
  }

  private async convertSnapshotToPackList(items: QuerySnapshot<DocumentData>) {
    return Promise.all(
      items.docs.map(async (item) => this.getOrdersPackData(item)),
    );
  }

  private async getOrdersPackData(snapshot: QueryDocumentSnapshot<DocumentData>) {
    const data = snapshot.data() as OrdersPack;

    const serviceOrders = data.serviceOrdersId?.length
      ? await this.serviceOrderRepository.findByIds(data.serviceOrdersId)
      : [];

    const servicesCount = await Promise.all(
      data.servicesCount.map(async (item) => ({
        ...item,
        service: await this.serviceRepository.findById(item.serviceId),
      })),
    );

    return {
      ...data,
      servicesCount,
      serviceOrders,
    };
  }
}
