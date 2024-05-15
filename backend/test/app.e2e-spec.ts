import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import setupTestingModule from './setUpTestingModule';
import { UsersService } from '../src/users/users.service';
import {
  EMAIL_FOR_TESTING,
  FULL_NAME_FOR_TESTING,
  PASSWORD_FOR_TESTING,
  USERNAME_FOR_TESTING,
} from '../src/auth/utils/singInUser';
import { AiApiService } from '../src/ai-api/ai-api.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const result = await setupTestingModule({
      providers: [UsersService, AiApiService],
    });
    app = result.app;
    const testingModule = result.testingModule;

    const usersService =
      await testingModule.resolve<UsersService>(UsersService);

    /**
     * Create a user for testing, this user is mean to use in these e2e tests for endpoints that require a user to be authenticated.
     */
    await usersService.createUserIfNotExists({
      email: EMAIL_FOR_TESTING,
      username: USERNAME_FOR_TESTING,
      password: PASSWORD_FOR_TESTING,
      fullName: FULL_NAME_FOR_TESTING,
    } as any);
  });

  beforeEach(async () => {
    const testingModule = await setupTestingModule();
    app = testingModule.app;

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect({
      statusCode: 200,
      data: 'Hello World!',
      message: 'OK',
    });
  });
});
