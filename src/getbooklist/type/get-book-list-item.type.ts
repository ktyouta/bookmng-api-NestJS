import { GoogleBooksAPIsModelItemsType } from "src/external/googlebooksapi/booklist/type/GoogleBooksAPIsModelItemsType";
import { GoogleBooksAPIsModelType } from "src/external/googlebooksapi/booklist/type/GoogleBooksAPIsModelType";

export type GetBooKListItemType = GoogleBooksAPIsModelItemsType & {
    bookshelfFlg: string,
}