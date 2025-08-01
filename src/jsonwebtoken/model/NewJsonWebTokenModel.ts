import { CookieOptions } from 'express';
import { envConfig } from 'src/common/const/EnvConfig';
import { FrontUserIdModel } from 'src/internal/common/FrontUserIdModel';
import { FrontUserPasswordModel } from 'src/internal/frontuserloginmaster/FrontUserPasswordModel';


export class NewJsonWebTokenModel {

    private readonly jwt = require("jsonwebtoken");
    // トークン
    private readonly _token: string;
    // cookieオプション
    static readonly COOKIE_OPTION: CookieOptions = {
        httpOnly: true,
    };

    constructor(frontUserIdModel: FrontUserIdModel, frontUserPasswordModel: FrontUserPasswordModel) {

        const jwtSecretKey = envConfig.jwtKey;

        if (!jwtSecretKey) {
            throw Error(`設定ファイルにjwtの秘密鍵が設定されていません。`);
        }

        const frontUserId = frontUserIdModel.frontUserId;

        if (!frontUserId) {
            throw Error(`jwtの作成にはユーザーIDが必要です。`);
        }

        const frontUserPassword = frontUserPasswordModel.frontUserPassword;

        if (!frontUserPassword) {
            throw Error(`jwtの作成にはパスワードが必要です。`);
        }

        const jwtStr = `${frontUserId},${frontUserPassword}`;
        this._token = this.jwt.sign({ ID: jwtStr }, jwtSecretKey);
    }

    get token() {
        return this._token;
    }

}