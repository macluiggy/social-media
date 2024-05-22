import { INestApplication } from '@nestjs/common';
import setupTestingModule from '../../../test/setUpTestingModule';
import { signInUser } from '../../auth/utils/singInUser';
import { followsModuleMetadata } from './follows.module';
import getApiEndpoint from '../../common/utils/getApiEndpoint';
import request from 'supertest';
import { Users } from '../users.entity';
import { Repository } from 'typeorm';
import generateUser from '../generate.user';

describe('Follow e2e', () => {
  let app: INestApplication;
  let user: Users;
  let accessToken: string;
  let userRespository: Repository<Users>;
  let randomUser: Users;

  beforeAll(async () => {
    const testingModule = await setupTestingModule(followsModuleMetadata);
    const module = testingModule.testingModule;
    app = testingModule.app;

    const data = await signInUser(app);
    accessToken = data.accessToken;

    user = data.user;

    userRespository = module.get('UsersRepository');
    randomUser = generateUser();
    await userRespository.save(randomUser);
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

  it('/user/:userId/follow/:otherUserId POST, should follow a user', async () => {
    const endpoint = getApiEndpoint(
      `follows/user/${user.id}/follow/${randomUser.id}`,
    );

    const res = await request(app.getHttpServer())
      .post(endpoint)
      .set({
        authorization: `Bearer ${accessToken}`,
      });

    expect(res.status).toBe(201);
    expect(res.body.data).toBeDefined();
  });

  afterAll(async () => {
    // delete data from the database
    await userRespository.remove(randomUser);
    await app.close();
  });
});
