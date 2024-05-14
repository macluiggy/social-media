// import * as path from 'path';

import { DataSource, DataSourceOptions } from 'typeorm';
// import { SeederOptions } from 'typeorm-extension';
// import UserSeeder from '../seeders/user.seeder';
// import userFactory from '../factories/user.factory';
// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import entities from '../entities';
// import envVariablesConfig from '../../common/envVariables';
// import * as dotenv from 'dotenv';
// import subscribers from '../subscribers';
import { typeOrmConfig } from './typeorm.config';
// dotenv.config();

// const { db } = envVariablesConfig;

// const migrationsPath = path.join(process.cwd(), 'src/db/migrations/*{.ts,.js}');
// const entitiesPath = path.join(
//   process.cwd(),
//   'src/**/*{.entity.ts,.entity.js}',
// );

export const config: any = typeOrmConfig;

export default new DataSource(typeOrmConfig as DataSourceOptions);
