import { GoogleBooksApiBooksDeitalBookIdModel } from "src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";
import { UpdateBookshelfMemoRequestDto } from "../dto/update-bookshelf-memo-request.dto";
import { MemoModel } from "./memo.model";

export class UpdateBookshelfMemoRequestModel {

    // メモ
    private readonly _memoModel: MemoModel;

    constructor(requestDto: UpdateBookshelfMemoRequestDto) {

        this._memoModel = new MemoModel(requestDto.memo);
    }

    get memoModel() {
        return this._memoModel;
    }
}