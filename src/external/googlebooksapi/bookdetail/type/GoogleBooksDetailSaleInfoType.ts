export type GoogleBooksDetailSaleInfoType = {
    // 対象国コード（例: "JP"）
    readonly country: string;
    // 販売状態（例: "FOR_SALE"）
    readonly saleability: string;
    // 電子書籍かどうか
    readonly isEbook: boolean;
    // 定価情報（任意）
    readonly listPrice?: {
        // 定価の金額
        readonly amount: number;
        // 通貨コード（例: "JPY"）
        readonly currencyCode: string;
    };
    // 実際の販売価格（任意）
    readonly retailPrice?: {
        // 販売価格の金額
        readonly amount: number;
        // 通貨コード
        readonly currencyCode: string;
    };
    // 購入用URL
    readonly buyLink?: string;
};
