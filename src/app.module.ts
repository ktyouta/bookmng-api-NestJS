import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestConnection } from './entities/TestConnection';
import ENV from "../env.json";
import * as dotenv from 'dotenv';
import { AccessInterceptor } from './interceptor/AccessInterceptor';
import { TestController } from './test/controller/test.controller';
import { TestService } from './test/service/test.service';
import { CONTROLLER_LIST } from './module/ControllerList';
import { PROVIDER_LIST } from './module/ProviderList';


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
      logging: true,
    }),
    TypeOrmModule.forFeature([TestConnection])
  ],
  controllers: CONTROLLER_LIST,
  providers: PROVIDER_LIST,
})
export class AppModule { }
