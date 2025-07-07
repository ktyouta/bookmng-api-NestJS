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
import { TYPEORM_CONFIG } from './typeorm.config';
import { ENTITIES_LIST } from './entities/EntitiesList';
import { TestModule } from './test/module/test.module';
import { FrontUserLoginModule } from './frontuserlogin/module/front-user-login.module';
import { CreateBookshelfModule } from './createbookshelf/module/create-bookshelf.module';
import { GetBookshelfListModule } from './getbookshelflist/module/get-bookshelf-list.module';
import { FrontUserCheckAuthModule } from './frontusercheckauth/module/front-user-check-auth.module';
import { FrontUserLogoutModule } from './frontuserlogout/module/front-user-logout.module';
import { GetBookshelfDetailModule } from './getbookshelfdetail/module/get-bookshelf-detail.module';
import { UpdateBookshelfSummaryModule } from './updatebookshelfsummary/module/update-bookshelf-summary.module';
import { UpdateBookshelfReviewModule } from './updatebookshelfreview/module/update-bookshelf-review.module';
import { GetReadStatusListModule } from './getreadstatuslist/module/get-read-status-list.module';
import { UpdateBookshelfStatusModule } from './updatebookshelfstatus/module/update-bookshelf-status.module';
import { CreateBookshelfMemoModule } from './createbookshelfmemo/module/create-bookshelf-memo.module';
import { UpdateBookshelfMemoModule } from './updatebookshelfmemo/module/update-bookshelf-memo.module';
import { DeleteBookshelfMemoModule } from './deletebookshelfmemo/module/delete-bookshelf-memo.module';
import { GetBookshelfMemoModule } from './getbookshelfmemo/module/get-bookshelf-memo.module';
import { GetBookshelfSortListModule } from './getbookshelfsortlist/module/get-bookshelf-sort-list.module';
import { GetTagListModule } from './gettaglist/module/get-tag-list.module';
import { GetBookshelfTagModule } from './getbookshelftag/module/get-bookshelf-tag.module';
import { UpdateBookshelfTagModule } from './updatebookshelftag/module/update-bookshelf-tag.module';


dotenv.config();

@Module({
  imports: [
    // DB設定
    TypeOrmModule.forRoot(TYPEORM_CONFIG),
    TypeOrmModule.forFeature(ENTITIES_LIST),
    // テスト接続用
    TestModule,
    // 書籍一覧取得
    GetBookListModule,
    // 書籍詳細取得
    GetBookDetailModule,
    // ユーザー情報作成
    CreateFrontUserModule,
    // ログイン(フロント)
    FrontUserLoginModule,
    // ログアウト(フロント)
    FrontUserLogoutModule,
    // 本棚情報登録
    CreateBookshelfModule,
    // 本棚一覧取得
    GetBookshelfListModule,
    // 本棚詳細取得
    GetBookshelfDetailModule,
    // 認証
    FrontUserCheckAuthModule,
    // 要約更新
    UpdateBookshelfSummaryModule,
    // レビュー更新
    UpdateBookshelfReviewModule,
    // 読書状況一覧取得
    GetReadStatusListModule,
    // 書籍ステータス更新
    UpdateBookshelfStatusModule,
    // 書籍メモ登録
    CreateBookshelfMemoModule,
    // 書籍メモ更新
    UpdateBookshelfMemoModule,
    // 書籍メモ削除
    DeleteBookshelfMemoModule,
    // 書籍メモ取得
    GetBookshelfMemoModule,
    // 本棚ソートリスト取得
    GetBookshelfSortListModule,
    // タグマスタ取得
    GetTagListModule,
    // 本棚タグ取得
    GetBookshelfTagModule,
    // 本棚タグ更新
    UpdateBookshelfTagModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    // インターセプター
    AccessInterceptor,
  ],
})
export class AppModule { }
