import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import entities from '../entities';
import * as dotenv from 'dotenv';
dotenv.config();
import { SeederOptions } from 'typeorm-extension';
import subscribers from '../subscribers';
import envVariables from '../../common/envVariables';
// import userFactory from '../factories/user.factory';
// import DB_MIGRATIONS from '../migrations';
import { DataSource } from 'typeorm';
import migrations from '../migrations';
import seeders from '../seeders';
import factories from '../factories';
// import seeders from '../seeders';

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

export { typeOrmConfig };

export default new DataSource(typeOrmConfig as any);
