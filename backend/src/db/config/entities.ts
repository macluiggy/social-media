import { MessageEntity } from '../../messages/entities/message.entity';
import { PostComment } from '../../posts/comments/entities/comment.entity';
import { Post } from '../../posts/entities/post.entity';
import { Like } from '../../posts/likes/entities/like.entity';
import { Follow } from '../../users/follows/entities/follow.entity';
import { UserEntity } from '../../users/users.entity';
import { SeederEntity } from '../seeders.entity';

export const entitiesObject = {
  UserEntity,
  SeederEntity,
};

export type Entities = UserEntity | SeederEntity | Post;
export default [
  UserEntity,
  SeederEntity,
  Post,
  Follow,
  Like,
  PostComment,
  MessageEntity,
];
