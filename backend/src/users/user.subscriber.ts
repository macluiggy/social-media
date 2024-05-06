import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { validateOrReject } from 'class-validator';
import { Users } from './users.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<Users> {
  listenTo() {
    return Users;
  }

  async beforeInsert(event: InsertEvent<Users>) {
    await validateOrReject(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<Users>) {
    await validateOrReject(event.entity);
  }
}
