export class GoogleBooksApiBookListMaxResultQuery {

    // 最大取得件数(デフォルト)
    static readonly DEFAULT = 40;
    // キー
    static readonly KEY = `maxResults`;
    // クエリーパラメータ
    private readonly _query: string;

    constructor(maxResult?: number) {

        const settingMaxResult = maxResult ?? GoogleBooksApiBookListMaxResultQuery.DEFAULT;

        this._query = `${GoogleBooksApiBookListMaxResultQuery.KEY}=${settingMaxResult}`;
    }

    get query() {
        return this._query;
    }
}