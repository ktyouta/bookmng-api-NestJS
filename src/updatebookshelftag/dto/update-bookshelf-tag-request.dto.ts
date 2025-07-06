import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { GoogleBooksApiBookDetailModel } from "src/external/googlebooksapi/bookdetail/model/GoogleBooksApiBookDetailModel";
import { GoogleBooksDetailResponseType } from "src/external/googlebooksapi/bookdetail/type/GoogleBooksDetailResponseType";
import { GoogleBooksApiBookListModel } from "src/external/googlebooksapi/booklist/model/GoogleBooksApiBookListModel";
import { GoogleBooksAPIsModelType } from "src/external/googlebooksapi/booklist/type/GoogleBooksAPIsModelType";
import { IsArray, IsOptional, IsString, Matches, ValidateNested } from "class-validator";
import { Transform, Type } from "class-transformer";
import { UpdateBookshelfTagReqeustTagType } from "../type/update-bookshelf-tag-request-tag.type";
import { UpdateBookshelfTagReqeustTagDto } from "./update-bookshelf-tag-request-tag.dto";

export class UpdateBookshelfTagRequestDto {

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateBookshelfTagReqeustTagDto)
    tag: UpdateBookshelfTagReqeustTagDto[];
}