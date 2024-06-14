import { DataSource, Repository } from 'typeorm';
import { Seeder, SeederFactory, SeederFactoryManager } from 'typeorm-extension';
import { SeederEntity } from '../seeders.entity';
import { Users } from '../../users/users.entity';
import { Post } from '../../posts/entities/post.entity';
import { Follow } from '../../users/follows/entities/follow.entity';
import { Like } from '../../posts/likes/entities/like.entity';
import { PostComment } from '../../posts/comments/entities/comment.entity';

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
    const postCommentRepository = dataSource.getRepository(PostComment);
    const postsRepository = dataSource.getRepository(Post);

    const userQueryBuilder = usersRepository.createQueryBuilder();
    // delete all users that have the email starting with 'dummy.'
    await userQueryBuilder
      .delete()
      .where('email like :email', { email: 'dummy.%' })
      .execute();

    // factories
    const userFactory = factoryManager.get(Users);
    const postsFactory = factoryManager.get(Post);
    const postCommentFactory = factoryManager.get(PostComment);

    const usersSaved = await this.seedUsersTable({ userFactory });
    const postsSaved = await this.seedPostsTable({
      postsFactory,
      postsRepository,
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

    await this.seedPostCommentsTable({
      posts: postsSaved,
      users: usersSaved,
      postCommentRepository,
      postCommentFactory,
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
    postsRepository,
  }: {
    postsFactory: SeederFactory<Post, unknown>;
    users: Users[];
    postsRepository: Repository<Post>;
  }) {
    const posts = [];
    for (const user of users) {
      for (let i = 0; i < 2; i++) {
        const post = await postsFactory.make({ user });
        posts.push(post);
      }
    }

    const postsSaved = postsRepository.create(posts);
    await postsRepository.save(postsSaved);
    return postsSaved;
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

  async seedPostCommentsTable({
    posts,
    users,
    postCommentRepository,
    postCommentFactory,
  }: {
    posts: Post[];
    users: Users[];
    postCommentRepository: Repository<PostComment>;
    postCommentFactory: SeederFactory<PostComment, unknown>;
  }) {
    const comments = [];

    for (const post of posts) {
      for (const user of users) {
        const comment = await postCommentFactory.make({
          post,
          user,
        });
        comments.push(comment);
      }
    }

    const postComments = postCommentRepository.create(comments);
    await postCommentRepository.save(postComments);

    // add replies to the created comments
    const replies = [];
    for (const comment of postComments) {
      // add two replies to each comment
      for (let i = 0; i < 2; i++) {
        const reply = await postCommentFactory.make({
          post: comment.post,
          user: users[Math.floor(Math.random() * users.length)],
          parentComment: comment,
        });
        replies.push(reply);
      }
    }

    const postCommentReplies = postCommentRepository.create(replies);
    await postCommentRepository.save(postCommentReplies);
  }
}
