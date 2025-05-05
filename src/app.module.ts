import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestConnection } from './entities/TestConnection';
import ENV from "../env.json";
import * as dotenv from 'dotenv';
import { AccessInterceptor } from './interceptor/access.interceptor';
import { TestController } from './test/controller/test.controller';
import { TestService } from './test/service/test.service';
import { GetBookListModule } from './getbooklist/module/get-book-list.module';
import { GetBookDetailModule } from './getbookdetail/module/get-book-detail.module';
import { SeqMaster } from './entities/SeqMaster';
import { CreateFrontUserModule } from './createfrontuser/module/create-front-user.module';


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
      entities: [
        TestConnection,
        SeqMaster
      ],
      migrations: ['src/migrations/*.ts'],
      synchronize: false,
      logging: true,
    }),
    TypeOrmModule.forFeature([TestConnection]),
    // 書籍一覧取得
    GetBookListModule,
    // 書籍詳細取得
    GetBookDetailModule,
    // ユーザー情報作成
    CreateFrontUserModule,
  ],
  controllers: [
    AppController,
    // テスト用
    TestController,
  ],
  providers: [
    AppService,
    // インターセプター
    AccessInterceptor,
    // テスト
    TestService,
  ],
})
export class AppModule { }
