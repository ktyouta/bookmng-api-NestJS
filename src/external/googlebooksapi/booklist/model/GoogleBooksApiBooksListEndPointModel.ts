import { QueryBuilderUtil } from "src/common/util/QueryBuilderUtil";
import { GoogleBooksApiBooksBasePathModel } from "../../common/model/GoogleBooksApiBooksBasePathModel";
import { GoogleBooksApiBookListKeyword } from "../properties/GoogleBooksApiBookListKeyword";
import { GoogleBooksApiBookListMaxResultQuery } from "../properties/GoogleBooksApiBookListMaxResultQuery";
import { GoogleBooksApiApiKeyQuery } from "../../common/properties/GoogleBooksApiApiKeyQuery";
import { GoogleBooksApiBookListStartIndexQuery } from "../properties/GoogleBooksApiBookListStartIndexQuery";


/**
 * Google Books Apiの書籍一覧取得エンドポイント
 */
export class GoogleBooksApiBooksListEndPointModel {

    private readonly _url: string;
    // パス
    private static readonly PATH: string = `${GoogleBooksApiBooksBasePathModel.BASE_PATH}/volumes`;
    // APIキー
    private readonly googleBooksApiApiKeyQuery: GoogleBooksApiApiKeyQuery = new GoogleBooksApiApiKeyQuery();


    constructor(googleBooksApiBookListKeyword: GoogleBooksApiBookListKeyword,
        googleBooksApiBookListStartIndexQuery: GoogleBooksApiBookListStartIndexQuery,
        googleBooksApiBookListMaxResultQuery: GoogleBooksApiBookListMaxResultQuery
    ) {

        // クエリパラメータを作成
        let query = `${googleBooksApiBookListKeyword.query}`;

        if (this.googleBooksApiApiKeyQuery.query) {
            query += `&${this.googleBooksApiApiKeyQuery.query}`;
        }

        if (googleBooksApiBookListStartIndexQuery.query) {
            query += `&${googleBooksApiBookListStartIndexQuery.query}`;
        }

        if (googleBooksApiBookListMaxResultQuery.query) {
            query += `&${googleBooksApiBookListMaxResultQuery.query}`;
        }

        this._url = `${GoogleBooksApiBooksListEndPointModel.PATH}${query ? `?${query}` : ``}`;
    }

    get url() {
        return this._url;
    }
}