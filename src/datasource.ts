import { DataSource } from 'typeorm';
import ENV from "../env.json";
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: ENV.DATABASE.HOST,
    port: ENV.DATABASE.PORT,
    username: ENV.DATABASE.USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: ENV.DATABASE.NAME,
    schema: ENV.DATABASE.SCHEMA,
    entities: ["src/entities/*.ts"],
    migrations: ["migrations/*.ts"],
    synchronize: false,
});