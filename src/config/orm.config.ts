// Packages
import dotenv, { DotenvConfigOutput } from 'dotenv';
import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';


const configResult: DotenvConfigOutput = dotenv.config();
if (configResult.error) {
  throw configResult.error;
}


const ormConfig: Options<PostgreSqlDriver> = {
  debug: true,
  dbName: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  entities: ['./dist/entities'], // path to your JS entities (dist), relative to `baseDir`
  entitiesTs: ['./src/entities'], // path to our TS entities (src), relative to `baseDir`
  migrations: {
    path: './dist/migrations', // path to the folder with migrations
    pathTs: './src/migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
  },
  seeder: {
    path: './dist/seeders',
    pathTs: './src/seeders', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
  tsNode: process.env.APP_ENV === 'development',
  type: 'postgresql',
  user: process.env.POSTGRES_USER,
  metadataProvider: TsMorphMetadataProvider
};

export default ormConfig;
