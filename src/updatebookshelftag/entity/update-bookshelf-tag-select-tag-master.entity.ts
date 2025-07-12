import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";
import { TagNameModel } from "../model/tag-name.model";

export class UpdateBookshelfTagSelectTagMasterEntity {

    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;
    // タグ名称
    private readonly _tagNameModel: TagNameModel;

    constructor(userIdModel: FrontUserIdModel,
        tagNameModel: TagNameModel
    ) {

        this._frontUserIdModel = userIdModel;
        this._tagNameModel = tagNameModel;
    }

    get frontUserId() {
        return this._frontUserIdModel.frontUserId;
    }

    get tagName() {
        return this._tagNameModel.tagName;
    }
}