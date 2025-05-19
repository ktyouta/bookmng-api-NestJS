import { FrontUserIdModel } from 'src/internal/common/FrontUserIdModel';
import { CookieModel } from '../../cookie/model/CookieModel';
import { JsonWebTokenUserInfoSelectEntity } from '../entity/JsonWebTokenUserInfoSelectEntity';
import { FrontUserInfoType } from '../type/FrontUserInfoType';
import { JsonWebTokenModel } from './JsonWebTokenModel';
import { NewJsonWebTokenModel } from './NewJsonWebTokenModel';
import { FrontUserPasswordModel } from 'src/internal/frontuserloginmaster/FrontUserPasswordModel';
import { envConfig } from 'src/common/const/EnvConfig';
import { JsonWebTokenUserInfoRepositoryJson } from '../repository/JsonWebTokenUserInfoRepositoryJson';
import { Request } from 'express';
import { EntityManager } from 'typeorm';
import { AppDataSource } from 'src/datasource';
import { DeleteFlgModel } from 'src/internal/common/DeleteFlgModel';


export class JsonWebTokenUserModel {

    private static readonly jwt = require("jsonwebtoken");
    private static readonly entityManager: EntityManager = AppDataSource.manager;
    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;
    // パスワード
    private readonly _frontUserPasswordModel: FrontUserPasswordModel;
    // フロントユーザー情報
    private readonly _frontUserInfo: FrontUserInfoType;

    private constructor(frontUserIdModel: FrontUserIdModel,
        frontUserPassword: FrontUserPasswordModel,
        frontUserInfo: FrontUserInfoType,
    ) {
        this._frontUserIdModel = frontUserIdModel;
        this._frontUserPasswordModel = frontUserPassword;
        this._frontUserInfo = frontUserInfo;
    }


    /**
     * jwtからユーザー情報を取得
     * @param token 
     * @returns 
     */
    static async get(req: Request) {

        const cookieModel = new CookieModel(req);

        // jwt
        const jsonWebTokenModel = new JsonWebTokenModel(cookieModel);
        const token = jsonWebTokenModel.token;

        if (!token) {
            throw Error(`トークンが存在しません。`);
        }

        const jwtSecretKey = envConfig.jwtKey;

        if (!jwtSecretKey) {
            throw Error(`設定ファイルにjwtの秘密鍵が設定されていません。`);
        }

        try {

            const decoded = this.jwt.verify(token, jwtSecretKey);

            if (!decoded) {
                throw Error(`jwtから認証情報の取得に失敗しました。`);
            }

            const id: string = decoded.ID;
            const verifyArray: string[] = id.split(',');

            if (!verifyArray || verifyArray.length !== 2) {
                throw Error(`jwtの認証情報が不正です。`);
            }

            const userId = Number.parseInt(verifyArray[0]);

            const frontUserIdModel: FrontUserIdModel = FrontUserIdModel.reConstruct(userId);
            const frontUserPassword: FrontUserPasswordModel = FrontUserPasswordModel.reConstruct(verifyArray[1]);

            // ユーザーマスタからデータを取得
            const frontUserList = await this.getFrontUser(
                frontUserIdModel,
                frontUserPassword,
            );

            // jwtのユーザー情報がユーザーマスタに存在しない
            if (!frontUserList || frontUserList.length === 0) {
                throw Error(`jwtのユーザー情報がユーザーログインマスタに存在しません。`);
            }

            return new JsonWebTokenUserModel(
                frontUserIdModel,
                frontUserPassword,
                frontUserList[0],
            );
        } catch (err) {
            throw Error(`jwt認証中にエラーが発生しました。ERROR:${err}`);
        }
    }


    get frontUserIdModel() {
        return this._frontUserIdModel;
    }

    get frontUserPasswordModel() {
        return this._frontUserPasswordModel;
    }

    get frontUserId() {
        return this._frontUserIdModel.frontUserId;
    }

    get frontUserInfo() {
        return this._frontUserInfo;
    }

    /**
     * jwt認証用のユーザー情報を取得
     * @param frontUserIdModel 
     * @param frontUserPassword 
     * @returns 
     */
    private static async getFrontUser(frontUserIdModel: FrontUserIdModel,
        frontUserPassword: FrontUserPasswordModel,) {

        // ユーザログイン情報取得用Entity
        const frontUserInfoCreateSelectEntity = new JsonWebTokenUserInfoSelectEntity(frontUserIdModel, frontUserPassword);

        const userId = frontUserInfoCreateSelectEntity.frontUserId;
        const password = frontUserInfoCreateSelectEntity.frontUserPassword;

        // ユーザー情報を取得
        const frontUserList = await this.entityManager.query(
            `SELECT 
                    *
                FROM 
                    bookmng.front_user_login_master a 
                INNER JOIN 
                    bookmng.front_user_info_master b
                    ON a.user_id = CAST($1 AS INTEGER) AND
                    a.password = $2 AND
                    a.delete_flg = $3 AND
                    a.user_id = b.user_id`,
            [userId, password, DeleteFlgModel.OFF]
        );

        return frontUserList;
    }
}