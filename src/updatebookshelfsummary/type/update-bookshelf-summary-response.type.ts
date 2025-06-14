import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { GoogleBooksApiBookDetailModel } from "src/external/googlebooksapi/bookdetail/model/GoogleBooksApiBookDetailModel";
import { GoogleBooksDetailResponseType } from "src/external/googlebooksapi/bookdetail/type/GoogleBooksDetailResponseType";

export type UpdateBookshelfSummaryResponseType = GoogleBooksDetailResponseType & {
    bookId: string,
};