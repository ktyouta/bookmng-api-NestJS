import { GoogleBooksApiBooksDeitalBookIdModel } from "src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";
import { ReviewModel } from "../model/review.model";

export class UpdateBookshelfReviewEntity {

    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;
    // 書籍ID
    private readonly _bookIdModel: GoogleBooksApiBooksDeitalBookIdModel;
    // レビュー
    private readonly _reviewModel: ReviewModel;

    constructor(userIdModel: FrontUserIdModel,
        bookIdModel: GoogleBooksApiBooksDeitalBookIdModel,
        reviewModel: ReviewModel) {

        this._frontUserIdModel = userIdModel;
        this._bookIdModel = bookIdModel;
        this._reviewModel = reviewModel
    }

    get frontUserId() {
        return this._frontUserIdModel.frontUserId;
    }

    get bookId() {
        return this._bookIdModel.id;
    }

    get review() {
        return this._reviewModel.review;
    }
}