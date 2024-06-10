import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
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
  user: Users;

  @ManyToOne('Post', (post: Post) => post.comments)
  post: Post;

  @ManyToOne(() => PostComment, (comment) => comment.childComments)
  parentComment: PostComment;

  @OneToMany(() => PostComment, (comment) => comment.parentComment)
  childComments: PostComment[];
}
