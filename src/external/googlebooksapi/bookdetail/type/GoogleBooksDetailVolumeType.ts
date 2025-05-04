export type GoogleBooksDetailVolumeType = {
    // 書籍タイトル
    readonly title: string;
    // サブタイトル（任意）
    readonly subtitle?: string;
    // 著者（複数可）
    readonly authors?: string[];
    // 出版社名
    readonly publisher?: string;
    // 出版日（例: "2008-05-08"）
    readonly publishedDate?: string;
    // 書籍の説明（あらすじ等）
    readonly description?: string;
    // ISBNなどの識別子一覧
    readonly industryIdentifiers?: {
        // 識別子の種類（例: "ISBN_13"）
        readonly type: string;
        // 実際の識別子
        readonly identifier: string;
    }[];
    // 総ページ数
    readonly pageCount?: number;
    // カテゴリ（例: "Computers"）
    readonly categories?: string[];
    // 平均評価（1〜5）
    readonly averageRating?: number;
    // レビュー数
    readonly ratingsCount?: number;
    // 成熟度評価（例: "NOT_MATURE"）
    readonly maturityRating?: string;
    // 匿名ログの許可可否
    readonly allowAnonLogging?: boolean;
    // コンテンツバージョン
    readonly contentVersion?: string;
    // サムネイル画像リンク
    readonly imageLinks?: {
        // 小サムネイルURL
        readonly smallThumbnail?: string;
        // サムネイルURL
        readonly thumbnail?: string;
    };
    // 書籍の言語コード（例: "ja"）
    readonly language?: string;
    // プレビュー用URL
    readonly previewLink?: string;
    // 書籍情報ページのURL
    readonly infoLink?: string;
    // 正規化された書籍URL
    readonly canonicalVolumeLink?: string;
};
