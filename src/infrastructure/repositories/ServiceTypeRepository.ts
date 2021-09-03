import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

import { ServiceType } from '@domain/entities/ServiceType';
import { IServiceTypeRepository } from '@domain/interfaces/IServiceTypeRepository';

import { Firebase } from './Firebase';

export class ServiceTypeRepository implements IServiceTypeRepository {
  readonly db: Firestore;
  readonly tableName: string;
  readonly table: CollectionReference;

  constructor() {
    this.db = Firebase.storage;
    this.tableName = 'serviceTypes';
    this.table = collection(this.db, this.tableName);
  }

  async create({ id, name }: ServiceType): Promise<ServiceType> {
    await setDoc(doc(this.table, id), {
      id,
      name,
    });

    return { id, name };
  }

  async update({ id, name }: ServiceType): Promise<ServiceType> {
    await setDoc(doc(this.table, id), {
      id,
      name,
    });

    return { id, name };
  }

  async destroy(id: string): Promise<string> {
    await deleteDoc(doc(this.table, id));
    return id;
  }

  async findAll(): Promise<ServiceType[]> {
    const snapshot = await getDocs(query(this.table));

    if (snapshot.empty) return [];

    return snapshot.docs.map((item) => item.data() as ServiceType);
  }

  async findById(id: string): Promise<ServiceType> {
    const snapshot = await getDoc(doc(this.table, id));

    if (!snapshot.exists) return null;

    return snapshot.data() as ServiceType;
  }

  async findByIds(ids: string[]): Promise<ServiceType[]> {
    const snapshot = await getDocs(query(this.table, where('id', 'in', ids)));

    if (snapshot.empty) return [];

    return snapshot.docs.map((item) => item.data() as ServiceType);
  }

  async findByName(name: string): Promise<ServiceType> {
    const snapshot = await getDocs(query(this.table, where('name', '==', name), limit(1)));

    if (snapshot.empty) return null;

    return snapshot.docs[0].data() as ServiceType;
  }
}
