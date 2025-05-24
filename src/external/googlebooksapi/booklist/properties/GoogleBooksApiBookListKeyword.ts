export class GoogleBooksApiBookListKeyword {

    // Google Books Api(書籍一覧)のクエリキー(キーワード)
    static readonly KEY: string = `q`;
    // クエリパラメータ
    private readonly _query: string;

    constructor(keyword: string) {

        if (!keyword) {
            throw Error(`Google Books Api(書籍一覧)の呼び出しにはキーワードが必須です。`);
        }

        this._query = `${GoogleBooksApiBookListKeyword.KEY}=${keyword}`;
    }

    get query() {
        return this._query;
    }
}