import { envConfig } from "src/common/const/EnvConfig";

export class GoogleBooksApiApiKeyQuery {

    // Google Books Apiのクエリキー(APIキー)
    static readonly KEY: string = `key`;
    // クエリーパラメータ
    private readonly _query: string;

    constructor() {

        if (!envConfig.googleBooksApiKey) {
            throw Error(`Google Books APIのAPIキーが存在しません。`);
        }

        this._query = `${GoogleBooksApiApiKeyQuery.KEY}=${envConfig.googleBooksApiKey}`
    }

    get query() {
        return this._query;
    }
}