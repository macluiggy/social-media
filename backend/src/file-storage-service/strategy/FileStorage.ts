import StorageStrategy from './StorageStrategy';

export default class FileStorage implements StorageStrategy {
  private fileStorage: StorageStrategy;

  constructor(fileStorage: StorageStrategy) {
    this.fileStorage = fileStorage;
  }
  uploadFile(file: Express.Multer.File, options?: any): Promise<string> {
    return this.fileStorage.uploadFile(file, options);
  }
  deleteFile(fileUrl: string, options?: any): Promise<void> {
    return this.fileStorage.deleteFile(fileUrl, options);
  }
}
