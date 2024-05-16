export default interface StorageStrategy {
  uploadFile(
    file: Express.Multer.File,
    options?: any,
  ): Promise<{
    storageKey: string;
  }>;
  deleteFile(fileUrl: string, options?: any): Promise<void>;
}
