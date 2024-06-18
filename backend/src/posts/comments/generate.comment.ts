import { PostComment } from './entities/comment.entity';
import { faker } from '@faker-js/faker';

export default function generateComment({
  postId,
  userId,
  parentCommentId = null,
}): PostComment {
  const comment = new PostComment();
  comment.content = faker.lorem.paragraphs(3);
  comment.postId = postId;
  comment.userId = userId;
  comment.parentCommentId = parentCommentId;
  return comment;
}
