import { GoogleBooksAPIsModelItemsType } from "src/external/googlebooksapi/booklist/type/GoogleBooksAPIsModelItemsType";
import { GoogleBooksAPIsModelType } from "src/external/googlebooksapi/booklist/type/GoogleBooksAPIsModelType";
import { GetBooKListItemType } from "./get-book-list-item.type";

export type GetBooKListResponseType = {
    readonly kind: string;
    readonly totalItems: number;
    readonly items: GetBooKListItemType[];
}