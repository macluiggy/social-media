import { setSeederFactory } from 'typeorm-extension';
import { entitiesObject } from '../entities';
const { Users } = entitiesObject;

export default setSeederFactory(Users, (faker) => {
  const user = new Users();
  user.fullName = faker.person.fullName();
  user.email = faker.internet.email({
    firstName: user.fullName.split(' ')[0],
    lastName: user.fullName.split(' ')[1],
  });
  user.password = faker.internet.password();
  user.phone = faker.phone.number();
  user.username = faker.internet.userName({
    firstName: user.fullName.split(' ')[0],
    lastName: user.fullName.split(' ')[1],
  });

  return user;
});
