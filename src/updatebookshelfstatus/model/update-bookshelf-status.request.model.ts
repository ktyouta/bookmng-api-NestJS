import { GoogleBooksApiBooksDeitalBookIdModel } from "src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";
import { ReadStatusModel } from "./read-status.model";
import { UpdateBookshelfStatusRequestDto } from "../dto/update-bookshelf-status-request.dto";
import { StartDateModel } from "./start-date.model";
import { EndDateModel } from "./end-date.model";
import { PurchaseDateModel } from "./purchase-date.model";
import { FavoriteLevelModel } from "./favorite-level.model";

export class UpdateBookshelfStatusRequestModel {

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

    constructor(requestDto: UpdateBookshelfStatusRequestDto) {

        this._readStatusModel = new ReadStatusModel(requestDto.readStatus);
        this._startDateModel = new StartDateModel(requestDto.startDate);
        this._endDateModel = new EndDateModel(requestDto.endDate);
        this._purchaseDateModel = new PurchaseDateModel(requestDto.purchaseDate);
        this._favoriteLevelModel = new FavoriteLevelModel(requestDto.favoriteLevel);
    }

    get readStatusModel() {
        return this._readStatusModel;
    }

    get readStatus() {
        return this._readStatusModel.readStatus;
    }

    get startDateModel() {
        return this._startDateModel;
    }

    get startDate() {
        return this._startDateModel.startDate;
    }

    get endDateModel() {
        return this._endDateModel;
    }

    get endDate() {
        return this._endDateModel.endDate;
    }

    get purchaseDateModel() {
        return this._purchaseDateModel;
    }

    get purchaseDate() {
        return this._purchaseDateModel.purchaseDate;
    }

    get favoriteLevelModel() {
        return this._favoriteLevelModel;
    }

    get favoriteLevel() {
        return this._favoriteLevelModel.favoriteLevel;
    }
}