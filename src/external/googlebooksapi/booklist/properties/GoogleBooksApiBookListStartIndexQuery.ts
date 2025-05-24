export class GoogleBooksApiBookListStartIndexQuery {

    // Google Books Api(書籍一覧)のクエリキー(書籍取得開始位置)
    static readonly KEY: string = `startIndex`;
    // クエリーパラメータ
    private readonly _query: string;


    constructor(startIndex?: number) {
        this._query = startIndex ? `${GoogleBooksApiBookListStartIndexQuery.KEY}=${startIndex}` : ``;
    }

    get query() {
        return this._query;
    }
}