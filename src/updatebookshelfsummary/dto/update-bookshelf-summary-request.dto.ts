import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { GoogleBooksApiBookDetailModel } from "src/external/googlebooksapi/bookdetail/model/GoogleBooksApiBookDetailModel";
import { GoogleBooksDetailResponseType } from "src/external/googlebooksapi/bookdetail/type/GoogleBooksDetailResponseType";
import { GoogleBooksApiBookListModel } from "src/external/googlebooksapi/booklist/model/GoogleBooksApiBookListModel";
import { GoogleBooksAPIsModelType } from "src/external/googlebooksapi/booklist/type/GoogleBooksAPIsModelType";
import { UpdateBookshelfSummaryResponseType } from "../type/update-bookshelf-summary-response.type";
import { IsString } from "class-validator";

export class UpdateBookshelfSummaryRequestDto {

    @IsString()
    summary: string;
}