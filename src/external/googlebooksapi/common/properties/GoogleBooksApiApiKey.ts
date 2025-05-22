import { envConfig } from "src/common/const/EnvConfig";

export class GoogleBooksApiApiKey {

    // Google Books Apiのクエリキー(APIキー)
    static readonly KEY: string = `key`;
    // Google Books ApiのAPIキー
    private readonly _value: string;

    constructor() {

        if (!envConfig.googleBooksApiKey) {
            throw Error(`Google Books APIのAPIキーが存在しません。`);
        }

        this._value = envConfig.googleBooksApiKey
    }

    get value() {
        return this._value;
    }
}