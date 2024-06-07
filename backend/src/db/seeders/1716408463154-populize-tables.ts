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

    // ---------------------------------------------------

    // respositories
    const followRepository = dataSource.getRepository(Follow);

    // factories
    const userFactory = factoryManager.get(Users);
    const postsFactory = factoryManager.get(Post);
    const likeFactory = factoryManager.get(Like);

    const usersSaved = await this.seedUsersTable({ userFactory });
    const postsSaved = await this.seedPostsTable({
      postsFactory,
      users: usersSaved,
    });

    await this.seedLikesTable({
      likeFactory,
      posts: postsSaved,
      users: usersSaved,
    });

    await this.seedFollowsTable({
      followRepository,
      users: usersSaved,
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
    followRepository,
    users,
  }: {
    followRepository: Repository<Follow>;
    users: Users[];
  }) {
    const firstUser = users[0];
    const followPromises = users.slice(1).map(async (user) => {
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
  }

  async seedLikesTable({
    likeFactory,
    posts,
    users,
  }: {
    likeFactory: SeederFactory<Like, unknown>;
    posts: Post[];
    users: Users[];
  }) {
    const populatedLikes: Like[] = [];
    for (const post of posts) {
      for (const user of users) {
        const like = await likeFactory.save({
          post,
          user,
        });
        populatedLikes.push(like);
      }
    }

    return populatedLikes;
  }
}
