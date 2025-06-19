import { GoogleBooksDetailResponseType } from "src/external/googlebooksapi/bookdetail/type/GoogleBooksDetailResponseType";

export type GetBookDetailResponseType = GoogleBooksDetailResponseType & {
    bookshelfFlg: string,
};