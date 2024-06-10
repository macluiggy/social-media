import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Post } from '../../entities/post.entity';
import { Users } from '../../../users/users.entity';

@Entity()
export class PostComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne('Users', (user: Users) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne('Post', (post: Post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => PostComment, (comment) => comment.childComments)
  @JoinColumn({ name: 'parent_comment_id' })
  parentComment: PostComment;

  @OneToMany(() => PostComment, (comment) => comment.parentComment)
  @JoinColumn({ name: 'parent_comment_id' })
  childComments: PostComment[];
}
