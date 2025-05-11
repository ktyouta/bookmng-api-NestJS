import { DataSource, DataSourceOptions } from 'typeorm';
import ENV from "../env.json";
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TestConnection } from './entities/TestConnection';
import { SeqMaster } from './entities/SeqMaster';
import { FrontUserLoginMaster } from './entities/FrontUserLoginMaster';
import { FrontUserInfoMaster } from './entities/FrontUserInfoMaster';
import { ENTITIES_LIST } from './entities/EntitiesList';

dotenv.config();

export const TYPEORM_CONFIG: DataSourceOptions = {
    type: 'postgres',
    host: ENV.DATABASE.HOST,
    port: ENV.DATABASE.PORT,
    username: ENV.DATABASE.USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: ENV.DATABASE.NAME,
    schema: ENV.DATABASE.SCHEMA,
    entities: ENTITIES_LIST,
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    //logging: true,
};
