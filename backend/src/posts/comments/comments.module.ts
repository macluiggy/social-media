import { Module, ModuleMetadata } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostComment } from './entities/comment.entity';

const commentsModuleMetadata: ModuleMetadata = {
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [TypeOrmModule.forFeature([PostComment])],
};
@Module(commentsModuleMetadata)
export class CommentsModule {}

export { commentsModuleMetadata };
