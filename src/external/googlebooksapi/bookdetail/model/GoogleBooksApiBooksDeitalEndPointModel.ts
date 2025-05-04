import { QueryBuilderUtil } from "src/common/util/QueryBuilderUtil";
import { GoogleBooksApiBooksBasePathModel } from "../../common/model/GoogleBooksApiBooksBasePathModel";
import { GoogleBooksApiBooksDeitalBookIdModel } from "../properties/GoogleBooksApiBooksDeitalBookIdModel";


/**
 * Google Books Apiの書籍詳細取得エンドポイント
 */
export class GoogleBooksApiBooksDeitalEndPointModel {

    private readonly _url: string;
    // パス
    private static readonly PATH: string = `${GoogleBooksApiBooksBasePathModel.BASE_PATH}/volumes`;


    constructor(googleBooksApiBooksDeitalBookIdModel: GoogleBooksApiBooksDeitalBookIdModel,) {

        this._url = `${GoogleBooksApiBooksDeitalEndPointModel.PATH}/${googleBooksApiBooksDeitalBookIdModel.id}}`
    }

    get url() {
        return this._url;
    }
}