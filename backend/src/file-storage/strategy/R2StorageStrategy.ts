import envVariables from '../../common/envVariables';
const cloudflare = envVariables.cloudflare;
import StorageStrategy from './StorageStrategy';
import {
  S3Client,
  // ListBucketsCommand,
  // ListObjectsV2Command,
  // GetObjectCommand,
  // PutObjectCommand,
} from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// const S3 =

export default class R2StorageStrategy implements StorageStrategy {
  private static instance: R2StorageStrategy;
  private s3: S3Client;
  private constructor() {
    // console.log('R2StorageStrategy constructor');
    this.s3 = new S3Client({
      region: 'auto',
      endpoint: `https://${cloudflare.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: cloudflare.s3AccessKeyId,
        secretAccessKey: cloudflare.s3SecretAccessKey,
      },
    });
  }

  static getInstance(): R2StorageStrategy {
    if (!this.instance) {
      this.instance = new R2StorageStrategy();
    }
    return this.instance;
  }
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
