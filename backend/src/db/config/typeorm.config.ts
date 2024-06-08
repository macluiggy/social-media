import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import entities from './entities';
import * as dotenv from 'dotenv';
dotenv.config();
import { SeederOptions } from 'typeorm-extension';
import subscribers from './subscribers';
import envVariables from '../../common/envVariables';
import { DataSource } from 'typeorm';
import migrations from './migrations';
import seeders from './seeders';
import factories from './factories';

const { db } = envVariables;
// detect entity files by ending with .entity.ts
const typeOrmConfig: TypeOrmModuleOptions & SeederOptions = {
  type: 'postgres',
  url: db.databaseUrl,
  entities: entities,
  subscribers: subscribers,
  synchronize: false,
  migrations: migrations,
  seeds: seeders,
  factories: factories,
  migrationsRun: true,
};
// const typeOrmConfig: TypeOrmModuleOptions & SeederOptions = {
//   type: 'sqlite',
//   database: 'database.sqlite',
//   entities: entities,
//   subscribers: subscribers,
//   synchronize: true,
//   migrations: migrations,
//   seeds: seeders,
//   factories: factories,
//   migrationsRun: true,
// };

export { typeOrmConfig };

export default new DataSource(typeOrmConfig as any);
