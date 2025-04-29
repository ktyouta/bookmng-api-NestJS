import { QueryBuilderUtil } from "src/common/util/QueryBuilderUtil";
import { GoogleBooksApiBooksBasePathModel } from "../../common/model/GoogleBooksApiBooksBasePathModel";
import { GoogleBooksApiBookListKeyword } from "../properties/GoogleBooksApiBookListKeyword";


/**
 * Google Books Apiの書籍一覧取得エンドポイント
 */
export class GoogleBooksApiBooksListEndPointModel {

    private readonly _url: string;
    // パス
    private static readonly PATH: string = `${GoogleBooksApiBooksBasePathModel.BASE_PATH}/volumes`;


    constructor(googleBooksApiBookListKeyword: GoogleBooksApiBookListKeyword,) {

        // クエリパラメータを作成
        const queryBuilder: QueryBuilderUtil = new QueryBuilderUtil(GoogleBooksApiBookListKeyword.QUERYKEY, googleBooksApiBookListKeyword.value);

        const queryParam = queryBuilder.createParam();

        this._url = `${GoogleBooksApiBooksListEndPointModel.PATH}${queryParam ? `?${queryParam}` : ``}`
    }

    get url() {
        return this._url;
    }
}