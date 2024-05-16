import { Injectable } from '@nestjs/common';
import StorageStrategy from './strategy/StorageStrategy';
import R2StorageStrategy from './strategy/R2StorageStrategy';

@Injectable()
export class FileStorageService implements StorageStrategy {
  private fileStorageService: StorageStrategy;
  constructor() {
    this.fileStorageService = R2StorageStrategy.getInstance();
    // this.fileStorageService = S3StorageStrategy.getInstance();
  }
  uploadFile(file: Express.Multer.File, options?: any) {
    return this.fileStorageService.uploadFile(file, options);
  }
  deleteFile(fileUrl: string, options?: any) {
    return this.fileStorageService.deleteFile(fileUrl, options);
  }
}
