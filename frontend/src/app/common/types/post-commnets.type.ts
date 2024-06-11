import { BasicUserDetails } from './user.type';

type PostComment = {
  id: number;
  postId: number;
  userId: number;
  parentCommentId?: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type PostCommentsWithUser = PostComment & {
  user: BasicUserDetails;
};

type PostCommentWithRelations = PostComment & {
  user: BasicUserDetails;
  parentComment?: PostCommentWithRelations;
  childComments: PostCommentWithRelations[];
  showReplyForm?: boolean;
  newReply?: string;
  
};

export { PostComment, PostCommentsWithUser, PostCommentWithRelations };