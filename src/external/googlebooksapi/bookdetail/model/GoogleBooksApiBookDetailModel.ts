import { ApiClient } from 'src/common/api/ApiClient';
import ENV from '../../../../../env.json';
import { GoogleBooksDetailResponseType } from '../type/GoogleBooksDetailResponseType';
import { GoogleBooksApiBooksDeitalEndPointModel } from './GoogleBooksApiBooksDeitalEndPointModel';


export class GoogleBooksApiBookDetailModel {

    // api通信用クラス
    private static readonly _apiClient: ApiClient = new ApiClient();
    // Google Books Apiの書籍詳細のレスポンス
    private readonly _response: GoogleBooksDetailResponseType;


    private constructor(response: GoogleBooksDetailResponseType) {

        this._response = response;
    }

    get response() {
        return this._response;
    }

    /**
     * Google Books Apiを呼び出す
     */
    static async call(googleBooksApiBooksDeitalEndPointModel: GoogleBooksApiBooksDeitalEndPointModel) {

        const apiUrl = googleBooksApiBooksDeitalEndPointModel.url;

        try {
            // Google Books Apiを呼び出す
            const response: GoogleBooksDetailResponseType = await this._apiClient.get(apiUrl);
            return new GoogleBooksApiBookDetailModel(response);
        } catch (err) {

            const errorDetails = {
                message: `Google Books Api(書籍詳細)の呼び出しでエラーが発生しました。`,
                url: apiUrl,
                error: err
            };

            throw Error(JSON.stringify(errorDetails));
        }
    }
}