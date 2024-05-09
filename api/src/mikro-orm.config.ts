import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import * as tsconfigPath from 'tsconfig-paths';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  tsconfigPath.register();
  dotenv.config();
}

export default defineConfig({
  extensions: [Migrator],
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  entities: ['dist/**/**/*.model.js', 'dist/**/**/**/*.model.js'],
  entitiesTs: ['src/**/**/*.model.ts', 'src/**/**/**/*.model.ts'],
  debug: process.env.NODE_ENV !== 'production',
  migrations: {
    path: './dist/infra/migrations',
    pathTs: './src/infra/migrations',
  },
});
