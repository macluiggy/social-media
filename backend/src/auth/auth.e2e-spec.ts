import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
// import { AppModule } from './../src/app.module';
import { AuthModule } from './auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from '../../typeorm.config';
import getApiEndpoint from '../common/utils/getApiEndpoint';
import { it } from 'vitest';
import { Users } from '../users/users.entity';
import { Repository } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<Users>;

  // const user = { email: 'test@test.com', password: 'password', };
  const user = new Users();
  user.email = 'example@mail.com';
  user.password = 'password';
  user.username = 'example';
  user.fullName = 'example';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, TypeOrmModule.forRoot(typeOrmConfig)],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get('UsersRepository');
    await app.init();
  });

  it('/auth/signup (POST)', () => {
    const endpoint = getApiEndpoint('auth/signup');
    const res = request(app.getHttpServer()).post(endpoint).send(user);

    return res.expect(201);
  });

  it('/auth/signin (POST)', async() => {
    const endpoint = getApiEndpoint('auth/signin');
    const res = await request(app.getHttpServer()).post(endpoint).send(user);

    return res.expect(201);
  });

  afterAll(async () => {
    // delete user
    const createdUser = await userRepository.findOne({
      where: { email: user.email },
    });
    if (createdUser) {
      await userRepository.remove(createdUser);
    }
    await app.close();
  });
});
