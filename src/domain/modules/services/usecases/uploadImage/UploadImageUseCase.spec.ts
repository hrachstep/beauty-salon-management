import { UploadImageUseCase } from './UploadImageUseCase';

describe('Upload Image usecase', () => {
  const storageProvider = {
    save: jest.fn(() => Promise.resolve('image-url')),
    delete: null,
  };

  const folder = 'nails';
  const image = 'image-file';

  const usecase = new UploadImageUseCase(storageProvider);

  it('should receive a image file and upload to an external storage provider', async () => {
    await usecase.execute(image, folder);

    expect(storageProvider.save).toHaveBeenCalledWith(image, folder);
  });

  it('should return a url after image upload', async () => {
    const result = await usecase.execute(image, folder);

    expect(result).toBeTruthy();
  });

  it('should return null if image dont exists', async () => {
    const result = await usecase.execute(null, folder);

    expect(result).toBeNull();
  });
});
