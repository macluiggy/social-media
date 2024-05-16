import { Injectable } from '@nestjs/common';
import StorageStrategy from './strategy/StorageStrategy';
import R2StorageStrategy from './strategy/R2StorageStrategy';

@Injectable()
export class FileStorageServiceService implements StorageStrategy {
  constructor(
    private fileStorageService: R2StorageStrategy,
    // private fileStorageService: S3StorageStrategy,
  ) {}
  uploadFile(file: Express.Multer.File, options?: any): Promise<string> {
    return this.fileStorageService.uploadFile(file, options);
  }
  deleteFile(fileUrl: string, options?: any): Promise<void> {
    return this.fileStorageService.deleteFile(fileUrl, options);
  }
}
