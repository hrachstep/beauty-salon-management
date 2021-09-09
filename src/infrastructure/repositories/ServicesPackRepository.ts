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

import { ServicesPack } from '@domain/entities/ServicesPack';
import { IServiceRepository } from '@domain/interfaces/IServiceRepository';
import { IServicesPackRepository } from '@domain/interfaces/IServicesPackRepository';
import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';

import { Firebase } from './Firebase';

@injectable()
export class ServicesPackRepository implements IServicesPackRepository {
  readonly db: Firestore;
  readonly tableName: string;
  readonly table: CollectionReference;

  constructor(
    @inject('ServiceTypeRepository')
    private serviceTypeRepository: IServiceTypeRepository,

    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,
  ) {
    this.db = Firebase.database;
    this.tableName = 'servicesPack';
    this.table = collection(this.db, this.tableName);
  }

  async create({
    id,
    customer,
    startDate,
    servicesCount,
    servicesId,
    price,
  }: ServicesPack): Promise<ServicesPack> {
    await setDoc(doc(this.table, id), {
      id,
      customer,
      price,
      startDate,
      servicesCount,
      servicesId,
    });

    return {
      id,
      customer,
      price,
      startDate,
      servicesCount,
      servicesId,
      services: [],
    };
  }

  async update({
    customer,
    price,
    servicesCount,
    startDate,
    id,
    servicesId,
    services,
  }: ServicesPack): Promise<ServicesPack> {
    await setDoc(doc(this.table, id), {
      id,
      customer,
      price,
      startDate,
      servicesCount,
      servicesId,
    });

    return {
      id,
      customer,
      price,
      startDate,
      servicesCount,
      services,
      servicesId,
    };
  }

  async destroy(id: string): Promise<string> {
    await deleteDoc(doc(this.table, id));
    return id;
  }

  async findAll(): Promise<ServicesPack[]> {
    const snapshot = await getDocs(query(this.table));

    if (snapshot.empty) return [];

    return this.convertSnapshotToPackList(snapshot);
  }

  async findByMonth(date: Date): Promise<ServicesPack[]> {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const snapshot = await getDocs(query(this.table, where('date', '>=', firstDay), where('date', '<=', lastDay)));

    if (snapshot.empty) return [];

    return this.convertSnapshotToPackList(snapshot);
  }

  async findById(id: string): Promise<ServicesPack> {
    const snapshot = await getDoc(doc(this.table, id));

    if (!snapshot.exists()) return null;

    return this.getServicesPackData(snapshot);
  }

  private async convertSnapshotToPackList(items: QuerySnapshot<DocumentData>) {
    return Promise.all(
      items.docs.map(async (item) => this.getServicesPackData(item)),
    );
  }

  private async getServicesPackData(snapshot: QueryDocumentSnapshot<DocumentData>) {
    const data = snapshot.data() as ServicesPack;

    const services = data.servicesId?.length
      ? await this.serviceRepository.findByIds(data.servicesId)
      : [];

    const servicesCount = await Promise.all(
      data.servicesCount.map(async (item) => ({
        ...item,
        serviceType: await this.serviceTypeRepository.findById(item.serviceTypeId),
      })),
    );

    return {
      ...data,
      servicesCount,
      services,
    };
  }
}
