// a way to save all the environment variables in one place
// and use them in the app
import * as dotenv from 'dotenv';
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = NODE_ENV === 'production';
// const DB_HOST = isProduction ? process.env.DB_HOST_PROD : process.env.DB_HOST;
// const DB_USER = isProduction ? process.env.DB_USER_PROD : process.env.DB_USER;
// const DB_PASSWORD = isProduction
//   ? process.env.DB_PASSWORD_PROD
//   : process.env.DB_PASSWORD;
// const DB_NAME = isProduction ? process.env.DB_NAME_PROD : process.env.DB_NAME;
// const DB_PORT = isProduction ? process.env.DB_PORT_PROD : process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

const config = {
  apiVersion: process.env.API_VERSION || 'v1',
  port: process.env.PORT || 4000,
  db: {
    host: DB_HOST || 'db',
    port: parseInt(DB_PORT, 10) || 5432,
    password: DB_PASSWORD || 'postgres',
    databaseName: DB_NAME || 'postgres',
    username: DB_USER || 'postgres',
  },
  nodeEnviroment: NODE_ENV,
  isProduction,
};

export default config;
