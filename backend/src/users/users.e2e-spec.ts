import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../db/config/typeorm.config';
import getApiEndpoint from '../common/utils/getApiEndpoint';
import { it } from 'vitest';
import { Users } from '../users/users.entity';
import { UsersModule } from '../users/users.module';
import { USERNAME_FOR_TESTING, signInUser } from '../auth/utils/singInUser';
import { AuthModule } from '../auth/auth.module';
import setupTestingModule from '../../test/setUpTestingModule';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let user: Users;
  let accessToken: string;

  beforeAll(async () => {
    const testingModule = await setupTestingModule({
      imports: [UsersModule, TypeOrmModule.forRoot(typeOrmConfig), AuthModule],
    });
    app = testingModule.app;

    const data = await signInUser(app);
    accessToken = data.accessToken;

    user = data.user;
  });

  it('/users GET, should get all users', async () => {
    const endpoint = getApiEndpoint('users');

    const res = await request(app.getHttpServer())
      .get(endpoint)
      .set({
        authorization: `Bearer ${accessToken}`,
      });

    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('/users/:id GET, should get a user', async () => {
    const endpoint = getApiEndpoint(`users/${user.id}`);

    const res = await request(app.getHttpServer())
      .get(endpoint)
      .set({
        authorization: `Bearer ${accessToken}`,
      });

    expect(res.status).toBe(200);
    expect(res.body.data.username).toBe(user.username);
  });

  it('/users/:id PUT, should update a user', async () => {
    const endpoint = getApiEndpoint(`users/${user.id}`);

    const res = await request(app.getHttpServer())
      .put(endpoint)
      .set({
        authorization: `Bearer ${accessToken}`,
      })
      .send({ username: USERNAME_FOR_TESTING });

    expect(res.status).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
