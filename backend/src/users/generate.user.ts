import { faker } from '@faker-js/faker';
import { Users } from './users.entity';

export default function generateUser(): Users {
  const user = new Users();
  user.username = faker.internet.userName();
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.phone = faker.phone.number();
  return user;
}
