import { GoogleBooksApiBooksDeitalBookIdModel } from "src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";
import { MemoModel } from "../model/memo.model";
import { MemoIdModel } from "../model/memo-id.model";

export class DeleteBookshelfMemoEntity {

    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;
    // 書籍ID
    private readonly _bookIdModel: BookIdModel;
    // メモID
    private readonly _memoIdModel: MemoIdModel;

    constructor(frontUserIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel,
        memoIdModel: MemoIdModel,
    ) {

        this._frontUserIdModel = frontUserIdModel;
        this._bookIdModel = bookIdModel;
        this._memoIdModel = memoIdModel;
    }

    get frontUserId() {
        return this._frontUserIdModel.frontUserId;
    }

    get bookId() {
        return this._bookIdModel.bookId;
    }

    get memoId() {
        return this._memoIdModel.memoId;
    }
}