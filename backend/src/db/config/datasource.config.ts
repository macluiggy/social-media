import * as path from 'path';

import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import UserSeeder from '../seeders/user.seeder';
import userFactory from '../factories/user.factory';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import entities from '../entities';

const migrationsPath = path.join(process.cwd(), 'src/db/migrations/*{.ts,.js}');
// const entitiesPath = path.join(
//   process.cwd(),
//   'src/**/*{.entity.ts,.entity.js}',
// );

export const config: DataSourceOptions & SeederOptions & TypeOrmModuleOptions =
  {
    type: 'postgres',
    host: 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    username: process.env.DB_USER || 'postgres',
    migrations: [migrationsPath],
    // migrations: ['dist/db/migrations/*{.ts,.js}'],
    // entities: [entitiesPath],
    entities: entities,
    seeds: [UserSeeder],
    factories: [userFactory],
  };

export default new DataSource(config);
