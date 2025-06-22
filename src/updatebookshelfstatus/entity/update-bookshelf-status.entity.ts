import { GoogleBooksApiBooksDeitalBookIdModel } from "src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";
import { ReadStatusModel } from "../model/read-status.model";
import { StartDateModel } from "../model/start-date.model";
import { EndDateModel } from "../model/end-date.model";
import { FavoriteLevelModel } from "../model/favorite-level.model";
import { PurchaseDateModel } from "../model/purchase-date.model";
import { UpdateBookshelfStatusRequestDto } from "../dto/update-bookshelf-status-request.dto";
import { UpdateBookshelfStatusRequestModel } from "../model/update-bookshelf-status.request.model";

export class UpdateBookshelfStatusEntity {

    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;
    // 書籍ID
    private readonly _bookIdModel: GoogleBooksApiBooksDeitalBookIdModel;
    // 読書状況
    private readonly _readStatusModel: ReadStatusModel;
    // 読書開始日
    private readonly _startDateModel: StartDateModel;
    // 読書終了日
    private readonly _endDateModel: EndDateModel;
    // 購入日
    private readonly _purchaseDateModel: PurchaseDateModel;
    // お気に入り度
    private readonly _favoriteLevelModel: FavoriteLevelModel;

    constructor(frontUserIdModel: FrontUserIdModel,
        bookIdModel: GoogleBooksApiBooksDeitalBookIdModel,
        updateBookshelfStatusRequestModel: UpdateBookshelfStatusRequestModel) {

        this._frontUserIdModel = frontUserIdModel;
        this._bookIdModel = bookIdModel;
        this._readStatusModel = updateBookshelfStatusRequestModel.readStatusModel;
        this._startDateModel = updateBookshelfStatusRequestModel.startDateModel;
        this._endDateModel = updateBookshelfStatusRequestModel.endDateModel;
        this._purchaseDateModel = updateBookshelfStatusRequestModel.purchaseDateModel;
        this._favoriteLevelModel = updateBookshelfStatusRequestModel.favoriteLevelModel;
    }

    get frontUserId() {
        return this._frontUserIdModel.frontUserId;
    }

    get bookId() {
        return this._bookIdModel.id;
    }

    get readStatus() {
        return this._readStatusModel.readStatus;
    }

    get startDate() {
        return this._startDateModel.startDate;
    }

    get endDate() {
        return this._endDateModel.endDate;
    }

    get purchaseDate() {
        return this._purchaseDateModel.purchaseDate;
    }

    get favoriteLevel() {
        return this._favoriteLevelModel.favoriteLevel;
    }
}