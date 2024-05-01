import * as path from 'path';

import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import UserSeeder from '../seeders/user.seeder';
import userFactory from '../factories/user.factory';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import entities from '../entities';
import envVariablesConfig from '../../common/config';
import * as dotenv from 'dotenv';
dotenv.config();

const { db } = envVariablesConfig;

const migrationsPath = path.join(process.cwd(), 'src/db/migrations/*{.ts,.js}');
// const entitiesPath = path.join(
//   process.cwd(),
//   'src/**/*{.entity.ts,.entity.js}',
// );

export const config: DataSourceOptions & SeederOptions & TypeOrmModuleOptions =
  {
    type: 'postgres',
    host: 'localhost',
    port: db.port || 5432,
    password: db.password || 'postgres',
    database: db.databaseName || 'postgres',
    username: db.username || 'postgres',
    migrations: [migrationsPath],
    // migrations: ['dist/db/migrations/*{.ts,.js}'],
    // entities: [entitiesPath],
    entities: entities,
    seeds: [UserSeeder],
    factories: [userFactory],
  };

export default new DataSource(config);
