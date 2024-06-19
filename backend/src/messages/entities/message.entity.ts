import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../../users/users.entity';

@Entity({
  name: 'messages',
})
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'sender_id',
  })
  senderId: number;

  @Column({ name: 'receiver_id' })
  receiverId: number;

  @Column()
  content: string;

  @Column({ name: 'is_read', default: false })
  isRead: boolean;

  @CreateDateColumn({
    name: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // Relations
  @ManyToOne('Users', (user: Users) => user.sentMessages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'sender_id' })
  sender: Users;

  @ManyToOne('Users', (user: Users) => user.receivedMessages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'receiver_id' })
  receiver: Users;
}
