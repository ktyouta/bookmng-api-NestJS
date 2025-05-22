import { QueryBuilderUtil } from "src/common/util/QueryBuilderUtil";
import { GoogleBooksApiBooksBasePathModel } from "../../common/model/GoogleBooksApiBooksBasePathModel";
import { GoogleBooksApiBookListKeyword } from "../properties/GoogleBooksApiBookListKeyword";
import { GoogleBooksApiBookListMaxResult } from "../properties/GoogleBooksApiBookListMaxResult";
import { GoogleBooksApiApiKey } from "../../common/properties/GoogleBooksApiApiKey";


/**
 * Google Books Apiの書籍一覧取得エンドポイント
 */
export class GoogleBooksApiBooksListEndPointModel {

    private readonly _url: string;
    // パス
    private static readonly PATH: string = `${GoogleBooksApiBooksBasePathModel.BASE_PATH}/volumes`;
    // APIキー
    private readonly googleBooksApiApiKey: GoogleBooksApiApiKey = new GoogleBooksApiApiKey();


    constructor(googleBooksApiBookListKeyword: GoogleBooksApiBookListKeyword,) {

        // クエリパラメータを作成
        const queryBuilder: QueryBuilderUtil = new QueryBuilderUtil(GoogleBooksApiBookListKeyword.QUERYKEY, googleBooksApiBookListKeyword.value);
        queryBuilder.add(GoogleBooksApiBookListMaxResult.KEY, GoogleBooksApiBookListMaxResult.VALUE);
        queryBuilder.add(GoogleBooksApiApiKey.KEY, this.googleBooksApiApiKey.value);

        const queryParam = queryBuilder.createParam();

        this._url = `${GoogleBooksApiBooksListEndPointModel.PATH}${queryParam ? `?${queryParam}` : ``}`
    }

    get url() {
        return this._url;
    }
}