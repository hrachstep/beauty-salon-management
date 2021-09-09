import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '@domain/interfaces/IStorageProvider';

@injectable()
export class UploadImageUseCase {
  constructor(
    @inject('StorageProvider')
    private readonly storageProvider: IStorageProvider,
  ) {}

  async execute(image: string, folderName: string): Promise<string> {
    if (!image) return null;

    const result = await this.storageProvider.save(image, folderName);

    return result;
  }
}
