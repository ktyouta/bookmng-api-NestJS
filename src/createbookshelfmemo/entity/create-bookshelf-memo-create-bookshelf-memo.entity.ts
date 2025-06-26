import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";
import { MemoModel } from "../model/memo.model";
import { MemoSeqModel } from "../model/memo-seq.model";

export class CreateBookshelfMemoCreateBookshelfMemoEntity {

    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;
    // 書籍ID
    private readonly _bookIdModel: BookIdModel;
    // メモ
    private readonly _memoModel: MemoModel;
    // シーケンス
    private readonly _memoSeqModel: MemoSeqModel;

    constructor(userIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel,
        memoModel: MemoModel,
        memoSeqModel: MemoSeqModel,
    ) {

        this._frontUserIdModel = userIdModel;
        this._bookIdModel = bookIdModel;
        this._memoModel = memoModel;
        this._memoSeqModel = memoSeqModel;
    }

    get frontUserId() {
        return this._frontUserIdModel.frontUserId;
    }

    get bookId() {
        return this._bookIdModel.bookId;
    }

    get memo() {
        return this._memoModel.memo;
    }

    get memoSeq() {
        return this._memoSeqModel.memoSeq;
    }
}