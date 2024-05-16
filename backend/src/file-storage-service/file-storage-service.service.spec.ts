import { Test, TestingModule } from '@nestjs/testing';
import { FileStorageServiceService } from './file-storage-service.service';

describe('FileStorageServiceService', () => {
  let service: FileStorageServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileStorageServiceService],
    }).compile();

    service = module.get<FileStorageServiceService>(FileStorageServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
