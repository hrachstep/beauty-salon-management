import {
  FirebaseStorage, getDownloadURL, ref, uploadBytes,
} from 'firebase/storage';
import fs from 'fs';
import path from 'path';
import { injectable } from 'tsyringe';

import { IStorageProvider } from '@domain/modules/services/interfaces/IStorageProvider';

import { Firebase } from '../shared/Firebase';

@injectable()
export class FirebaseStorageProvider implements IStorageProvider {
  readonly storage: FirebaseStorage;

  constructor() {
    this.storage = Firebase.storage;
  }

  async save(file: string, folder: string): Promise<string> {
    const fileName = path.basename(file);
    const imageRef = ref(this.storage, `${folder}\\${fileName}`);

    const image = fs.readFileSync(file);
    await uploadBytes(imageRef, image);

    return getDownloadURL(imageRef);
  }

  async delete(file: string, folder: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
