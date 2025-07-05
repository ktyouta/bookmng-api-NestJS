import { GoogleBooksApiBooksDeitalBookIdModel } from "src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";
import { SummaryModel } from "../model/summary.model";

export class UpdateBookshelfSummaryEntity {

    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;
    // 書籍ID
    private readonly _bookIdModel: BookIdModel;
    // 要約
    private readonly _summaryModel: SummaryModel;

    constructor(userIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel,
        summaryModel: SummaryModel) {

        this._frontUserIdModel = userIdModel;
        this._bookIdModel = bookIdModel;
        this._summaryModel = summaryModel
    }

    get frontUserId() {
        return this._frontUserIdModel.frontUserId;
    }

    get bookId() {
        return this._bookIdModel.bookId;
    }

    get summary() {
        return this._summaryModel.summary;
    }
}