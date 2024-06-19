import { MessageEntity } from '../../messages/entities/message.entity';
import { PostCommentEntity } from '../../posts/comments/entities/comment.entity';
import { PostEntity } from '../../posts/entities/post.entity';
import { Like } from '../../posts/likes/entities/like.entity';
import { Follow } from '../../users/follows/entities/follow.entity';
import { UserEntity } from '../../users/users.entity';
import { SeederEntity } from '../seeders.entity';

export const entitiesObject = {
  UserEntity,
  SeederEntity,
};

export type Entities = UserEntity | SeederEntity | PostEntity;
export default [
  UserEntity,
  SeederEntity,
  PostEntity,
  Follow,
  Like,
  PostCommentEntity,
  MessageEntity,
];
