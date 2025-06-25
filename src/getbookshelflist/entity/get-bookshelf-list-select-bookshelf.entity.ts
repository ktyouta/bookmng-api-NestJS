import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";
import { GetBookshelfListRequestModel } from "../model/get-bookshelf-list-request.model";
import { ReadStatusModel } from "../model/read-status.model";
import { FavoriteLevelModel } from "../model/favorite-level.model";

export class GetBookshelfListSelectBookshelfEntity {

    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;
    // 読書状況
    private readonly _readStatusModel: ReadStatusModel;
    // お気に入り度
    private readonly _favoriteLevelModel: FavoriteLevelModel;

    constructor(userIdModel: FrontUserIdModel,
        getBookshelfListRequestModel: GetBookshelfListRequestModel
    ) {

        this._frontUserIdModel = userIdModel;
        this._readStatusModel = getBookshelfListRequestModel.readStatusModel;
        this._favoriteLevelModel = getBookshelfListRequestModel.favoriteLevelModel;
    }

    get frontUserId() {
        return this._frontUserIdModel.frontUserId;
    }

    get readStatus() {
        return this._readStatusModel.readStatus;
    }

    get favoriteLevel() {
        return this._favoriteLevelModel.favoriteLevel;
    }
}