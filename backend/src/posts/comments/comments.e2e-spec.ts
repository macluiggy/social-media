import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import setupTestingModule from '../../../test/setUpTestingModule';
import { commentsModuleMetadata } from './comments.module';
import { signInUser } from '../../auth/utils/singInUser';
import { Users } from '../../users/users.entity';
import generatePost from '../generate.post';
import { Post } from '../entities/post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import getApiEndpoint from '../../common/utils/getApiEndpoint';
import generateComment from './generate.comment';

describe('Comment Controller (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let user: Users;
  let post: Post;
  let postsRepository: Repository<Post>;
  const baseUrl = 'post-comments';

  beforeAll(async () => {
    const testingModule = await setupTestingModule(commentsModuleMetadata);
    app = testingModule.app;
    const module = testingModule.testingModule;

    const data = await signInUser(app);
    accessToken = data.accessToken;

    user = data.user;

    post = generatePost({ userId: user.id });

    postsRepository = module.get(getRepositoryToken(Post));

    // create a post
    post = await postsRepository.save(post);
  });

  it('/post-comments POST, should create a comment', async () => {
    // create a comment
    const comment = generateComment({ postId: post.id, userId: user.id });

    const endpoint = getApiEndpoint(`${baseUrl}`);

    const res = await request(app.getHttpServer())
      .post(endpoint)
      .set({
        authorization: `Bearer ${accessToken}`,
      })
      .send(comment);

    return expect(res.status).toBe(201);
  });

  afterAll(async () => {
    // delete the post
    await postsRepository.delete(post.id);

    await app.close();
  });
});
