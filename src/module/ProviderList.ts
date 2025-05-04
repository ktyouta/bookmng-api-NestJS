import { AppService } from "src/app.service";
import { GetBookDetailService } from "src/getbookdetail/service/get-book-detail.service";
import { GetBookListService } from "src/getbooklist/service/get-book-list.service";
import { AccessInterceptor } from "src/interceptor/AccessInterceptor";
import { TestService } from "src/test/service/test.service";

export const PROVIDER_LIST = [
    AppService,
    // インターセプター
    AccessInterceptor,
    // テスト
    TestService,
    // 書籍一覧取得
    GetBookListService,
    // 書籍詳細取得
    GetBookDetailService,
];