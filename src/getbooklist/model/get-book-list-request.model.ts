import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { GoogleBooksApiBookListMaxResultQuery } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListMaxResultQuery";
import { GoogleBooksApiBookListStartIndexQuery } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListStartIndexQuery";
import { GetBookListRequestDto } from "../dto/get-book-list-reques.dto";

export class GetBookListRequestModel {

    // キーワード
    private readonly _keywordModel: GoogleBooksApiBookListKeyword;
    // 書籍一覧取得開始位置
    private readonly _startIndexModel: GoogleBooksApiBookListStartIndexQuery;
    // 最大取得件数
    private readonly _maxResultModel: GoogleBooksApiBookListMaxResultQuery;

    constructor(getBookListRequestDto: GetBookListRequestDto) {

        this._keywordModel = new GoogleBooksApiBookListKeyword(getBookListRequestDto.q);
        this._startIndexModel = new GoogleBooksApiBookListStartIndexQuery(getBookListRequestDto.startIndex);
        this._maxResultModel = new GoogleBooksApiBookListMaxResultQuery(getBookListRequestDto.maxResult);
    }

    get keywordModel() {
        return this._keywordModel;
    }

    get startIndexModel() {
        return this._startIndexModel;
    }

    get maxResultModel() {
        return this._maxResultModel;
    }
}