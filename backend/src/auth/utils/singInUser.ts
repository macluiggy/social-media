import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import getApiEndpoint from '../../common/utils/getApiEndpoint';

const EMAIL = 'test-user-for-testing@test.com';
const PASSWORD = '123456';

type SingInUserResponse = {
  accessToken: string;
  user: any;
};

class Singleton {
  private static instance: SingInUserResponse | null = null;

  private constructor(private app: INestApplication) {}

  public static async getInstance(
    app: INestApplication,
  ): Promise<SingInUserResponse> {
    if (!this.instance) {
      const endpoint = getApiEndpoint('auth/signin');
      const response = await request(app.getHttpServer())
        .post(endpoint)
        .send({ email: EMAIL, password: PASSWORD });

      this.instance = response.body?.data;
    }

    return this.instance;
  }
}

export async function signInUser(
  app: INestApplication,
): Promise<SingInUserResponse> {
  return Singleton.getInstance(app);
}
