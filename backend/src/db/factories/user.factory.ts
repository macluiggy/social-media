import { setSeederFactory } from 'typeorm-extension';
import { entitiesObject } from '../config/entities';
import { DEFAULT_LANG } from '../../lang';
const { Users } = entitiesObject;

export default setSeederFactory(Users, (faker) => {
  const user = new Users();
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.email = faker.internet.email({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  // add dummy so the dummy users can be easily identified and deleted in database
  user.email = `dummy.${user.email}`; // use something like: select * from users where email like 'dummy.%'; to find all dummy users
  user.password = faker.internet.password();
  user.phone = faker.phone.number();
  user.username = faker.internet.userName({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  user.preferredLanguage = DEFAULT_LANG;

  return user;
});
