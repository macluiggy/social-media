import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { validateOrReject } from 'class-validator';
import { Users } from './users.entity';
import { FileStorageService } from '../file-storage/file-storage.service';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<Users> {
  private fileStorageService: FileStorageService = new FileStorageService();
  constructor() {}
  listenTo() {
    return Users;
  }

  async beforeInsert(event: InsertEvent<Users>) {
    await validateOrReject(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<Users>) {
    await validateOrReject(event.entity);
  }
  async afterLoad(entity: Users): Promise<any> {
    if (entity.profileImageKey) {
      const profileImageUrl = await this.fileStorageService.getSignedUrl(
        entity.profileImageKey,
      );
      entity.profileImageUrl = profileImageUrl;
    }
  }
}
