import { Test, TestingModule } from '@nestjs/testing';
import { IaApiController } from './ia-api.controller';
import { IaApiService } from './ia-api.service';

describe('IaApiController', () => {
  let controller: IaApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IaApiController],
      providers: [IaApiService],
    }).compile();

    controller = module.get<IaApiController>(IaApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
