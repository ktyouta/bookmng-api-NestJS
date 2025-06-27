import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { GoogleBooksApiBookDetailModel } from "src/external/googlebooksapi/bookdetail/model/GoogleBooksApiBookDetailModel";
import { GoogleBooksDetailResponseType } from "src/external/googlebooksapi/bookdetail/type/GoogleBooksDetailResponseType";
import { GoogleBooksApiBookListModel } from "src/external/googlebooksapi/booklist/model/GoogleBooksApiBookListModel";
import { GoogleBooksAPIsModelType } from "src/external/googlebooksapi/booklist/type/GoogleBooksAPIsModelType";
import { IsOptional, IsString, Matches } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateBookshelfMemoRequestDto {

    memo: string;
}