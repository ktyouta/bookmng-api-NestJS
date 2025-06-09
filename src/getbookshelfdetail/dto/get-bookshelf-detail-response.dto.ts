import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { GoogleBooksApiBookDetailModel } from "src/external/googlebooksapi/bookdetail/model/GoogleBooksApiBookDetailModel";
import { GoogleBooksDetailResponseType } from "src/external/googlebooksapi/bookdetail/type/GoogleBooksDetailResponseType";
import { GoogleBooksApiBookListModel } from "src/external/googlebooksapi/booklist/model/GoogleBooksApiBookListModel";
import { GoogleBooksAPIsModelType } from "src/external/googlebooksapi/booklist/type/GoogleBooksAPIsModelType";
import { GetBookshelfDetailResponseType } from "../type/get-bookshelf-detail-response.type";

export class GetBookshelfDetailResponse {

    private readonly _data: GetBookshelfDetailResponseType;

    constructor(bookshelf: BookshelfTransaction,
        googleBooksApiBookDetailModel: GoogleBooksApiBookDetailModel) {

        this._data = {
            ...googleBooksApiBookDetailModel.response,
            ...bookshelf
        };
    }

    get data() {
        return this._data;
    }
}