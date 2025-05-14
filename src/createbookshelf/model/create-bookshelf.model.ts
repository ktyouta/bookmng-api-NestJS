import { FrontUserBirthdayModel } from "src/internal/frontuserinfomaster/FrontUserBirthdayModel";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";
import { CreateBookshelfRequestDto } from "../dto/create-bookshelf-request.dto";

export class CreateBookshelfRequestModel {

    // 書籍ID
    private readonly _bookIdModel: BookIdModel;

    constructor(createBookshelfRequestDto: CreateBookshelfRequestDto) {

        this._bookIdModel = new BookIdModel(createBookshelfRequestDto.bookId);
    }

    get bookIdModel() {
        return this._bookIdModel;
    }
}