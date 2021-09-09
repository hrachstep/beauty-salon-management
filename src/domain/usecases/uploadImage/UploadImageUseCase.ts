import { IStorageProvider } from '@domain/interfaces/IStorageProvider';

export class UploadImageUseCase {
  constructor(
    private readonly storageProvider: IStorageProvider,
    private readonly folderName: string,
  ) {}

  async execute(image: string): Promise<string> {
    if (!image) return null;

    const result = await this.storageProvider.save(image, this.folderName);

    return result;
  }
}
