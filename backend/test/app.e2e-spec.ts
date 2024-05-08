import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import setupTestingModule from './setUpTestingModule';

describe('AppController (e2e)', () => {
  let app: INestApplication;

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
