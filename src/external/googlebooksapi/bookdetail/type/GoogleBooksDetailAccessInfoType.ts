export type GoogleBooksDetailAccessInfoType = {
    // 対象国コード
    readonly country: string;
    // 閲覧可否（例: "PARTIAL"）
    readonly viewability: string;
    // 埋め込み可能かどうか
    readonly embeddable: boolean;
    // パブリックドメインかどうか
    readonly publicDomain: boolean;
    // 音声読み上げ許可（例: "ALLOWED"）
    readonly textToSpeechPermission: string;
    // EPUBフォーマットの可用性
    readonly epub: { readonly isAvailable: boolean };
    // PDFフォーマットの可用性
    readonly pdf: { readonly isAvailable: boolean };
    // Webリーダーリンク
    readonly webReaderLink: string;
    // アクセス状態（例: "SAMPLE"）
    readonly accessViewStatus: string;
    // 引用共有の許可
    readonly quoteSharingAllowed: boolean;
};
