import { GoogleBooksApiBookListModel } from "src/external/googlebooksapi/booklist/model/GoogleBooksApiBookListModel";
import { GoogleBooksAPIsModelType } from "src/external/googlebooksapi/booklist/type/GoogleBooksAPIsModelType";

export class CreateFrontUserResponseDto {

    private readonly _data: GoogleBooksAPIsModelType;

    constructor(bookListModel: GoogleBooksApiBookListModel) {

        this._data = bookListModel.response;
    }

    get data() {
        return this._data;
    }
}