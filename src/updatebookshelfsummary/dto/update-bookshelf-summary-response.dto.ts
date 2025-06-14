import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { GoogleBooksApiBookDetailModel } from "src/external/googlebooksapi/bookdetail/model/GoogleBooksApiBookDetailModel";
import { GoogleBooksDetailResponseType } from "src/external/googlebooksapi/bookdetail/type/GoogleBooksDetailResponseType";
import { GoogleBooksApiBookListModel } from "src/external/googlebooksapi/booklist/model/GoogleBooksApiBookListModel";
import { GoogleBooksAPIsModelType } from "src/external/googlebooksapi/booklist/type/GoogleBooksAPIsModelType";
import { UpdateBookshelfSummaryResponseType } from "../type/update-bookshelf-summary-response.type";

export class UpdateBookshelfSummaryResponse {

    private readonly _data: UpdateBookshelfSummaryResponseType;

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