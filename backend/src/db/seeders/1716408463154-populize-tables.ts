import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { SeederEntity } from '../seeders.entity';
import { Users } from '../../users/users.entity';
import { Post } from '../../posts/entities/post.entity';
import { Follow } from '../../users/follows/entities/follow.entity';

export class PopulizeTables1716408463154 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const seederRepository = dataSource.getRepository(SeederEntity);
    const seederName = 'PopulizeTables1716408463154';

    const seeder = await seederRepository.findOne({
      where: { name: seederName },
    });

    if (seeder) {
      console.log(`Seeder "${seederName}" already executed. Skipping...`);
      return;
    }

    // ---------------------------------------------------

    // respositories
    const followRepository = dataSource.getRepository(Follow);

    // factories
    const userFactory = factoryManager.get(Users);
    const postsFactory = factoryManager.get(Post);

    const usersSaved = await userFactory.saveMany(20);
    const postsPromises = usersSaved.map(async (user) => {
      await postsFactory.saveMany(5, {
        user,
      });
    });
    await Promise.all(postsPromises);

    // make first user follow all other users and all other users follow the first user
    const firstUser = usersSaved[0];
    const followPromises = usersSaved.slice(1).map(async (user) => {
      await followRepository.insert({
        follower: user,
        following: firstUser,
      });
      await followRepository.insert({
        follower: firstUser,
        following: user,
      });
    });
    await Promise.all(followPromises);

    if (seeder) {
      seeder.executed = true;
    } else {
      await seederRepository.insert({
        name: seederName,
        executed: true,
      });
    }

    console.log('PopulizeTables1716408463154 seeder executed');
  }
}
