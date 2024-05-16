import StorageStrategy from './StorageStrategy';

export default class R2StorageStrategy implements StorageStrategy {
  async uploadFile(file: Express.Multer.File, options?: any): Promise<string> {
    console.log('options', options);

    // Your code to upload the file goes here
    return 'https://r2-storage.com/' + file.filename;
  }

  async deleteFile(fileUrl: string, options?: any): Promise<void> {
    console.log('options', options, fileUrl);
    // Your code to delete the file goes here
    return;
  }
}
