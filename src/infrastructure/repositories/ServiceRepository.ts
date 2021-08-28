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
  where,
} from 'firebase/firestore';

import { Service } from '@domain/entities/Service';
import { ServiceType } from '@domain/entities/ServiceType';
import { IServiceRepository } from '@domain/interfaces/IServiceRepository';

import { Firebase } from './Firebase';

export class ServiceRepository implements IServiceRepository {
  readonly db: Firestore;
  readonly tableName: string;
  readonly table: CollectionReference;

  constructor() {
    this.db = Firebase.storage;
    this.tableName = 'services';
    this.table = collection(this.db, this.tableName);
  }

  private async getServiceTypes(ids: string[]): Promise<ServiceType[]> {
    const serviceTypesSnapshot = await getDocs(query(collection(this.db, 'serviceTypes'), where('id', 'in', ids)));
    return serviceTypesSnapshot.docs.map((item) => item.data() as ServiceType);
  }

  async create({
    id,
    customer,
    servicesDoneIds,
    price,
    date,
    isFromPack,
  }: Service): Promise<Service> {
    await setDoc(doc(this.table, id), {
      id,
      customer,
      servicesDoneIds,
      price,
      date,
      isFromPack,
    });

    return {
      id,
      customer,
      servicesDoneIds,
      servicesDone: await this.getServiceTypes(servicesDoneIds),
      price,
      date,
      isFromPack,
    };
  }

  async update({
    id,
    customer,
    servicesDoneIds,
    price,
    date,
    isFromPack,
  }: Service): Promise<Service> {
    await setDoc(doc(this.table, id), {
      id,
      customer,
      servicesDoneIds,
      price,
      date,
      isFromPack,
    });

    return {
      id,
      customer,
      servicesDoneIds,
      servicesDone: await this.getServiceTypes(servicesDoneIds),
      price,
      date,
      isFromPack,
    };
  }

  async destroy(id: string): Promise<string> {
    await deleteDoc(doc(this.table, id));
    return id;
  }

  private async getServiceData(snapshot: QueryDocumentSnapshot<DocumentData>): Promise<Service> {
    const data = snapshot.data();

    const servicesDone = await this.getServiceTypes(data.servicesDoneIds);

    return {
      ...data,
      servicesDone,
    } as Service;
  }

  private async convertSnapshotToServiceList(items: QuerySnapshot<DocumentData>) {
    return Promise.all(
      items.docs.map(async (item) => this.getServiceData(item)),
    );
  }

  async findAll(): Promise<Service[]> {
    const snapshot = await getDocs(query(this.table));

    if (snapshot.empty) return [];

    return this.convertSnapshotToServiceList(snapshot);
  }

  async findByMonth(date: Date): Promise<Service[]> {
    // const snapshot = await getDocs(query(this.table, where('date', )));

    // if (snapshot.empty) return [];

    // return this.convertSnapshotToServiceList(snapshot);
    return [];
  }

  async findById(id: string): Promise<Service> {
    const snapshot = await getDoc(doc(this.table, id));

    if (!snapshot.exists()) return null;

    return this.getServiceData(snapshot);
  }
}
