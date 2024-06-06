import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { Users } from '../../../users/users.entity';
// import { Post } from '../../entities/post.entity';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', name: 'user_id', nullable: false })
  userId: number;

  @Column({ type: 'int', name: 'post_id', nullable: false })
  postId: number;

  @Column({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'updated_at', nullable: false })
  updatedAt: Date;

  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  // @ManyToOne(() => Users, (user) => user.likes)
  // user: Users;

  // @ManyToOne(() => Post, (post) => post.likes)
  // post: Post;
}
