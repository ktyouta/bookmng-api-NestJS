import { AppController } from "src/app.controller";
import { GetBookListController } from "src/getbooklist/controller/getbooklist.controller";
import { TestController } from "src/test/controller/test.controller";

export const CONTROLLER_LIST = [
    AppController,
    // テスト用エンド
    TestController,
    // 書籍一覧取得
    GetBookListController,
];