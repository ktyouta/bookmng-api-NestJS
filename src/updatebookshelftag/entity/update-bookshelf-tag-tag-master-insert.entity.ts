import { GoogleBooksApiBooksDeitalBookIdModel } from "src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";
import { UpdateBookshelfTagRequestDto } from "../dto/update-bookshelf-tag-request.dto";
import { TagIdModel } from "../model/tag-id.model";
import { TagListType } from "../type/tag-list.type";

export class UpdateBookshelfTagTagMasterInsertEntity {

    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;
    // タグ
    private readonly _tag: TagListType

    constructor(frontUserIdModel: FrontUserIdModel,
        tag: TagListType
    ) {

        this._frontUserIdModel = frontUserIdModel;
        this._tag = tag;
    }

    get frontUserId() {
        return this._frontUserIdModel.frontUserId;
    }

    get tag() {
        return this._tag;
    }
}