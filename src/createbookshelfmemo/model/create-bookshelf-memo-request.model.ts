import { FrontUserBirthdayModel } from "src/internal/frontuserinfomaster/FrontUserBirthdayModel";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";
import { CreateBookshelfMemoRequestDto } from "../dto/create-bookshelf-memo-request.dto";
import { MemoModel } from "./memo.model";

export class CreateBookshelfMemoRequestModel {

    // 書籍ID
    private readonly _bookIdModel: BookIdModel;
    // メモ
    private readonly _memoModel: MemoModel;

    constructor(createBookshelfMemoRequestDto: CreateBookshelfMemoRequestDto) {

        this._bookIdModel = new BookIdModel(createBookshelfMemoRequestDto.bookId);
        this._memoModel = new MemoModel(createBookshelfMemoRequestDto.memo);
    }

    get bookIdModel() {
        return this._bookIdModel;
    }

    get memoModel() {
        return this._memoModel;
    }
}