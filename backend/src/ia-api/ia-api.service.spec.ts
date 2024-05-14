import { Test, TestingModule } from '@nestjs/testing';
import { IaApiService } from './ia-api.service';

describe('IaApiService', () => {
  let service: IaApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IaApiService],
    }).compile();

    service = module.get<IaApiService>(IaApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
