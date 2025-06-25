import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { GoogleBooksApiBookListMaxResultQuery } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListMaxResultQuery";
import { GoogleBooksApiBookListStartIndexQuery } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListStartIndexQuery";
import { GetBookshelfListRequestDto } from "../dto/get-bookshelf-list-request.dto";
import { ReadStatusModel } from "./read-status.model";
import { FavoriteLevelModel } from "./favorite-level.model";


export class GetBookshelfListRequestModel {

    // 読書状況
    private readonly _readStatusModel: ReadStatusModel;
    // お気に入り度
    private readonly _favoriteLevelModel: FavoriteLevelModel;

    constructor(getBookshelfListRequestDto: GetBookshelfListRequestDto) {

        this._readStatusModel = new ReadStatusModel(getBookshelfListRequestDto.readStatus);
        this._favoriteLevelModel = new FavoriteLevelModel(getBookshelfListRequestDto.favoriteLevel);
    }

    get readStatusModel() {
        return this._readStatusModel;
    }

    get favoriteLevelModel() {
        return this._favoriteLevelModel;
    }
}