import { Module } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { FollowsController } from './follows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from './entities/follow.entity';

@Module({
  controllers: [FollowsController],
  providers: [FollowsService],
  imports: [TypeOrmModule.forFeature([Follow])],
})
export class FollowsModule {}
