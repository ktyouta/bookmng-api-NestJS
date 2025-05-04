import { AppController } from "src/app.controller";
import { GetBookDetailController } from "src/getbookdetail/controller/get-book-detail.controller";
import { GetBookListController } from "src/getbooklist/controller/get-book-list.controller";
import { TestController } from "src/test/controller/test.controller";

export const CONTROLLER_LIST = [
    AppController,
    // テスト用エンド
    TestController,
    // 書籍一覧取得
    GetBookListController,
    // 書籍詳細取得
    GetBookDetailController,
];