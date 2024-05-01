import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import entities from './src/db/entities';
import * as dotenv from 'dotenv';
dotenv.config();
import { SeederOptions } from 'typeorm-extension';
import subscribers from './src/db/subscribers';

const migrationsPath = path.join(process.cwd(), 'src/db/migrations/*{.ts}');

const typeOrmConfig: TypeOrmModuleOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'db', // docker-compose service name, in this case, the name of the service is db, use db only if both services are in the same network, i mean if you are using docker-compose with app service and daba service in the same docker-compose file
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'postgres',
  username: process.env.DB_USER || 'postgres',
  migrations: [migrationsPath],
  entities,
  // synchronize: true,
  seeds: ['serc/db/seeds/**/*{.ts}'],
  factories: ['src/db/factories/**/*{.ts}'],
  subscribers: subscribers,
};

export default typeOrmConfig;
