import { GoogleBooksApiBooksDeitalBookIdModel } from "src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";
import { UpdateBookshelfTagRequestDto } from "../dto/update-bookshelf-tag-request.dto";
import { TagIdModel } from "../model/tag-id.model";
import { TagListType } from "../type/tag-list.type";
import { TagNameModel } from "../model/tag-name.model";
import { TagSeqModel } from "../model/tag-seq.model";

export class UpdateBookshelfTagTagMasterInsertEntity {

    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;
    // タグ
    private readonly _tagNameModel: TagNameModel
    // タグシーケンス
    private readonly _tagSeqModel: TagSeqModel

    constructor(frontUserIdModel: FrontUserIdModel,
        tagNameModel: TagNameModel,
        tagSeqModel: TagSeqModel
    ) {

        this._frontUserIdModel = frontUserIdModel;
        this._tagNameModel = tagNameModel;
        this._tagSeqModel = tagSeqModel;
    }

    get frontUserId() {
        return this._frontUserIdModel.frontUserId;
    }

    get tagName() {
        return this._tagNameModel.tagName;
    }

    get tagSeq() {
        return this._tagSeqModel.tagSeq;
    }
}