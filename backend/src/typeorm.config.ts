import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import entities from './db/entities';
import * as dotenv from 'dotenv';
dotenv.config();
import { SeederOptions } from 'typeorm-extension';
import subscribers from './db/subscribers';
import envVariables from './common/envVariables';
import userFactory from './db/factories/user.factory';
import UserSeeder from './db/seeders/user.seeder';

const { db } = envVariables;

const migrationsPath = path.join(process.cwd(), 'src/db/migrations/*{.ts}');

const typeOrmConfig: TypeOrmModuleOptions & SeederOptions = {
  type: 'postgres',
  // host: db.host || 'db', // docker-compose service name, in this case, the name of the service is db, use db only if both services are in the same network, i mean if you are using docker-compose with app service and daba service in the same docker-compose file
  // port: db.port || 5432,
  // password: db.password || 'postgres',
  // database: db.databaseName || 'postgres',
  // username: db.username || 'postgres',
  url: db.databaseUrl,
  migrations: [migrationsPath],
  entities,
  // synchronize: true,
  // seeds: ['serc/db/seeds/**/*{.ts}'],
  // factories: ['src/db/factories/**/*{.ts}'],
  seeds: [UserSeeder],
  factories: [userFactory],
  subscribers: subscribers,
};

export default typeOrmConfig;