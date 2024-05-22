import { faker } from '@faker-js/faker';
import { Users } from './users.entity';

export default function generateUser(): Users {
  const user = new Users();
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.username = faker.internet.userName({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  user.email = faker.internet.email({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  user.password = faker.internet.password({
    memorable: true,
  });
  user.phone = faker.phone.number();
  return user;
}
