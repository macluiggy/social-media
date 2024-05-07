import { INestApplication } from '@nestjs/common';
import request from 'supertest';
// import { AppModule } from './../src/app.module';
// import { AuthModule } from './auth.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from '../../typeorm.config';
import getApiEndpoint from '../common/utils/getApiEndpoint';
import { it } from 'vitest';
import { Users } from '../users/users.entity';
import { PostsModule } from './posts.module';
import { UsersModule } from '../users/users.module';
import { Post } from './entities/post.entity';
import generatePost from './generate.post';
import { signInUser } from '../auth/utils/singInUser';
import { AuthModule } from '../auth/auth.module';
import setupTestingModule from '../../test/setUpTestingModule';
describe('AppController (e2e)', () => {
  let app: INestApplication;
  let user: Users;
  let post: Post;
  let accessToken: string;

  beforeAll(async () => {
    app = await setupTestingModule({
      imports: [
        PostsModule,
        TypeOrmModule.forRoot(typeOrmConfig),
        UsersModule,
        AuthModule,
      ],
    });

    const data = await signInUser(app);
    accessToken = data.accessToken;

    user = data.user;

    post = generatePost({ userId: user.id });
  });

  it('/post POST, should create a post', async () => {
    const endpoint = getApiEndpoint('posts');

    const res = await request(app.getHttpServer())
      .post(endpoint)
      .set({
        authorization: `Bearer ${accessToken}`,
      })
      .send(post);

    return expect(res.status).toBe(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
