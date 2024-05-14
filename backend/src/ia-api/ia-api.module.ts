import { Module } from '@nestjs/common';
import { IaApiService } from './ia-api.service';
import { IaApiController } from './ia-api.controller';

@Module({
  controllers: [IaApiController],
  providers: [IaApiService],
})
export class IaApiModule {}
