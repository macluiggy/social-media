import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersController } from './users.controller';
import { AiApiService } from '../ai-api/ai-api.service';
import { FileStorageService } from '../file-storage/file-storage.service';
// import { LangService } from '../lang/lang.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])], // provides the User entity to the UsersService with the repository injection
  providers: [UsersService, AiApiService, FileStorageService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
