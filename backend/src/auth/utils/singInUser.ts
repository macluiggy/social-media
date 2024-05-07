import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import getApiEndpoint from '../../common/utils/getApiEndpoint';

export async function signInUser(
  app: INestApplication,
  email: string,
  password: string,
): Promise<string> {
  const endpoint = getApiEndpoint('auth/signin');
  const response = await request(app.getHttpServer())
    .post(endpoint)
    .send({ email, password });

  if (response.statusCode !== 200) {
    throw new Error(`Sign-in failed with status code ${response.statusCode}`);
  }

  const { accessToken } = response.body;
  return accessToken;
}
