import { GoogleBooksDetailAccessInfoType } from "./GoogleBooksDetailAccessInfoType";
import { GoogleBooksDetailSaleInfoType } from "./GoogleBooksDetailSaleInfoType";
import { GoogleBooksDetailSearchInfoType } from "./GoogleBooksDetailSearchInfoType";
import { GoogleBooksDetailVolumeType } from "./GoogleBooksDetailVolumeType";

export type GoogleBooksDetailResponseType = {
    // レスポンス種別（例: "books#volume"）
    readonly kind: string;
    // ボリュームID（Google Books内のユニークID）
    readonly id: string;
    // キャッシュ制御用のETag
    readonly etag: string;
    // このリソースのURL
    readonly selfLink: string;
    // 書籍の詳細情報
    readonly volumeInfo: GoogleBooksDetailVolumeType;
    // 販売に関する情報
    readonly saleInfo?: GoogleBooksDetailSaleInfoType;
    // 閲覧に関する情報
    readonly accessInfo?: GoogleBooksDetailAccessInfoType;
    // 検索に関連する情報（あれば）
    readonly searchInfo?: GoogleBooksDetailSearchInfoType;
};
