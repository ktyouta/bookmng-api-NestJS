export class GoogleBooksApiBookListKeyword {

    private readonly _value: string;
    // Google Books Api(書籍一覧)のクエリキー(キーワード)
    static readonly QUERYKEY: string = `q`;

    constructor(keyword: string) {

        if (!keyword) {
            throw Error(`Google Books Api(書籍一覧)の呼び出しにはキーワードが必須です。`);
        }

        this._value = keyword;
    }

    get value() {
        return this._value;
    }
}