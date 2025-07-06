import { GoogleBooksApiBooksDeitalBookIdModel } from "src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";
import { UpdateBookshelfTagRequestDto } from "../dto/update-bookshelf-tag-request.dto";
import { TagNameModel } from "./tag-name.model";
import { TagListType } from "../type/tag-list.type";
import { UpdateBookshelfTagReqeustTagDto } from "../dto/update-bookshelf-tag-request-tag.dto";
import { TagIdModel } from "./tag-id.model";

export class UpdateBookshelfTagRequestModel {

    // タグ
    private readonly _tagList: TagListType[]

    constructor(requestDto: UpdateBookshelfTagRequestDto) {

        this._tagList = requestDto.tag.map((e: UpdateBookshelfTagReqeustTagDto) => {
            return {
                tagId: new TagIdModel(e.tagId),
                tagName: new TagNameModel(e.tagName),
            }
        });
    }

    get tagList() {
        return this._tagList;
    }
}