import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import getApiEndpoint from '../../common/utils/getApiEndpoint';

const EMAIL = 'test-user-for-testing@test.com';
const PASSWORD = '123456';

type SingInUserResponse = {
  accessToken: string;
};
export async function signInUser(
  app: INestApplication,
  email: string = EMAIL,
  password: string = PASSWORD,
): Promise<SingInUserResponse> {
  const endpoint = getApiEndpoint('auth/signin');
  const response = await request(app.getHttpServer())
    .post(endpoint)
    .send({ email, password });

  if (response.statusCode !== 200) {
    throw new Error(`Sign-in failed with status code ${response.statusCode}`);
  }

  const body = response.body;
  return body;
}
