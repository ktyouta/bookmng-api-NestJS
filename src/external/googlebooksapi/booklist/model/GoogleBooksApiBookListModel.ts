import { ApiClient } from 'src/common/api/ApiClient';
import ENV from '../../../../../env.json';
import { GoogleBooksAPIsModelType } from '../type/GoogleBooksAPIsModelType';
import { GoogleBooksApiBooksListEndPointModel } from './GoogleBooksApiBooksListEndPointModel';


export class GoogleBooksApiBookListModel {

    // api通信用クラス
    private static readonly _apiClient: ApiClient = new ApiClient();
    // Google Books Apiの書籍一覧のレスポンス
    private readonly _response: GoogleBooksAPIsModelType;


    private constructor(response: GoogleBooksAPIsModelType) {

        this._response = response;
    }

    get response() {
        return this._response;
    }

    /**
     * Google Books Apiを呼び出す
     */
    static async call(googleBooksApiBooksListEndPointModel: GoogleBooksApiBooksListEndPointModel) {

        const apiUrl = googleBooksApiBooksListEndPointModel.url;

        try {
            // Google Books Apiを呼び出す
            const response: GoogleBooksAPIsModelType = await this._apiClient.get(apiUrl);
            return new GoogleBooksApiBookListModel(response);
        } catch (err) {

            const errorDetails = {
                message: `Google Books Api(書籍一覧)の呼び出しでエラーが発生しました。`,
                url: apiUrl,
                error: err
            };

            throw Error(JSON.stringify(errorDetails));
        }
    }
}