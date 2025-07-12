import { GoogleBooksApiBooksDeitalBookIdModel } from "src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";
import { UpdateBookshelfTagRequestDto } from "../dto/update-bookshelf-tag-request.dto";
import { TagIdModel } from "../model/tag-id.model";
import { TagListType } from "../type/tag-list.type";

export class UpdateBookshelfTagDeleteTagMasterEntity {

    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;

    constructor(frontUserIdModel: FrontUserIdModel,) {

        this._frontUserIdModel = frontUserIdModel;
    }

    get frontUserId() {
        return this._frontUserIdModel.frontUserId;
    }
}