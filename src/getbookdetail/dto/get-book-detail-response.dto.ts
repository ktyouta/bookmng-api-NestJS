import { GoogleBooksApiBookDetailModel } from "src/external/googlebooksapi/bookdetail/model/GoogleBooksApiBookDetailModel";
import { GoogleBooksDetailResponseType } from "src/external/googlebooksapi/bookdetail/type/GoogleBooksDetailResponseType";
import { GoogleBooksApiBookListModel } from "src/external/googlebooksapi/booklist/model/GoogleBooksApiBookListModel";
import { GoogleBooksAPIsModelType } from "src/external/googlebooksapi/booklist/type/GoogleBooksAPIsModelType";

export class GetBookDetailResponse {

    private readonly _data: GoogleBooksDetailResponseType;

    constructor(googleBooksApiBookDetailModel: GoogleBooksApiBookDetailModel) {

        this._data = googleBooksApiBookDetailModel.response;
    }

    get data() {
        return this._data;
    }
}