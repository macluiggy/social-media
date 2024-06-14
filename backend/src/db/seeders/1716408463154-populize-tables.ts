import { DataSource, Repository } from 'typeorm';
import { Seeder, SeederFactory, SeederFactoryManager } from 'typeorm-extension';
import { SeederEntity } from '../seeders.entity';
import { Users } from '../../users/users.entity';
import { Post } from '../../posts/entities/post.entity';
import { Follow } from '../../users/follows/entities/follow.entity';
import { Like } from '../../posts/likes/entities/like.entity';

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

    // if (seeder) {
    //   console.log(`Seeder "${seederName}" already executed. Skipping...`);
    //   return;
    // }

    // repositories
    const usersRepository = dataSource.getRepository(Users);
    const followsRepository = dataSource.getRepository(Follow);
    const likesRepository = dataSource.getRepository(Like);

    const userQueryBuilder = usersRepository.createQueryBuilder();
    // delete all users that have the email starting with 'dummy.'
    await userQueryBuilder
      .delete()
      .where('email like :email', { email: 'dummy.%' })
      .execute();

    // factories
    const userFactory = factoryManager.get(Users);
    const postsFactory = factoryManager.get(Post);

    const usersSaved = await this.seedUsersTable({ userFactory });
    const postsSaved = await this.seedPostsTable({
      postsFactory,
      users: usersSaved,
    });

    await this.seedLikesTable({
      posts: postsSaved,
      users: usersSaved,
      likeRepository: likesRepository,
    });

    await this.seedFollowsTable({
      users: usersSaved,
      followRepository: followsRepository,
    });

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

  async seedUsersTable({
    userFactory,
  }: {
    userFactory: SeederFactory<Users, unknown>;
  }) {
    const usersSaved = await userFactory.saveMany(10);
    return usersSaved;
  }

  async seedPostsTable({
    postsFactory,
    users,
  }: {
    postsFactory: SeederFactory<Post, unknown>;
    users: Users[];
  }) {
    const postsPromises = users.map(async (user) => {
      const postsSaved = await postsFactory.saveMany(2, {
        user,
      });
      return postsSaved;
    });
    const populatedPosts = await Promise.all(postsPromises);
    return populatedPosts.flat();
  }

  async seedFollowsTable({
    users,
    followRepository,
  }: {
    users: Users[];
    followRepository: Repository<Follow>;
  }) {
    const follows = [];

    for (const user of users) {
      for (const otherUser of users) {
        if (user.id !== otherUser.id) {
          follows.push({
            following: user,
            follower: otherUser,
          });
        }
      }
    }

    await followRepository
      .createQueryBuilder()
      .insert()
      .into(Follow)
      .values(follows)
      .execute();
  }

  async seedLikesTable({
    posts,
    users,
    likeRepository,
  }: {
    posts: Post[];
    users: Users[];
    likeRepository: Repository<Like>;
  }) {
    const likes = [];

    for (const post of posts) {
      for (const user of users) {
        likes.push({
          post,
          user,
        });
      }
    }

    await likeRepository
      .createQueryBuilder()
      .insert()
      .into(Like)
      .values(likes)
      .execute();
  }
}
