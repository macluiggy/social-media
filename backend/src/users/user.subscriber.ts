import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { validateOrReject } from 'class-validator';
import { User } from './users.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    await validateOrReject(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<User>) {
    await validateOrReject(event.entity);
  }
}
