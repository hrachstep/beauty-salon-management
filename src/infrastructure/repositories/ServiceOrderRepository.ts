import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  setDoc,
  where,
} from 'firebase/firestore';
import { inject, injectable } from 'tsyringe';

import { ServiceOrder } from '@domain/modules/services/entities/ServiceOrder';
import { IServiceOrderRepository } from '@domain/modules/services/interfaces/IServiceOrderRepository';
import { IServiceRepository } from '@domain/modules/services/interfaces/IServiceRepository';

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
    servicesDoneIds,
    price,
    date,
    isFromPack,
    image,
  }: ServiceOrder): Promise<ServiceOrder> {
    await setDoc(doc(this.table, id), {
      id,
      customer,
      servicesDoneIds,
      price,
      date,
      isFromPack,
      image,
    });

    return {
      id,
      customer,
      servicesDoneIds,
      servicesDone: await this.serviceRepository.findByIds(servicesDoneIds),
      price,
      date,
      isFromPack,
      image,
    };
  }

  async update({
    id,
    customer,
    servicesDoneIds,
    price,
    date,
    isFromPack,
    image,
  }: ServiceOrder): Promise<ServiceOrder> {
    await setDoc(doc(this.table, id), {
      id,
      customer,
      servicesDoneIds,
      price,
      date,
      isFromPack,
      image,
    });

    return {
      id,
      customer,
      servicesDoneIds,
      servicesDone: await this.serviceRepository.findByIds(servicesDoneIds),
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

    const servicesDone = await this.serviceRepository.findByIds(data.servicesDoneIds);

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

  async findAll(): Promise<ServiceOrder[]> {
    const snapshot = await getDocs(query(this.table));

    if (snapshot.empty) return [];

    return this.convertSnapshotToServiceList(snapshot);
  }

  async findByIds(ids: string[]): Promise<ServiceOrder[]> {
    const snapshot = await getDocs(query(this.table, where('id', 'in', ids)));

    if (snapshot.empty) return [];

    return this.convertSnapshotToServiceList(snapshot);
  }

  async findByMonth(date: Date): Promise<ServiceOrder[]> {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const snapshot = await getDocs(query(this.table, where('date', '>=', firstDay), where('date', '<=', lastDay)));

    if (snapshot.empty) return [];

    return this.convertSnapshotToServiceList(snapshot);
  }

  async findById(id: string): Promise<ServiceOrder> {
    const snapshot = await getDoc(doc(this.table, id));

    if (!snapshot.exists()) return null;

    return this.getServiceData(snapshot);
  }
}
