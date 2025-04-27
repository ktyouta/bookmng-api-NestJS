import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestConnection } from './entities/TestConnection';
import ENV from "../env.json";
import * as dotenv from 'dotenv';


dotenv.config();

@Module({
  imports: [
    // DB設定
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: ENV.DATABASE.HOST,
      port: ENV.DATABASE.PORT,
      username: ENV.DATABASE.USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: ENV.DATABASE.NAME,
      schema: ENV.DATABASE.SCHEMA,
      entities: [TestConnection],
      migrations: ['src/migrations/*.ts'],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
