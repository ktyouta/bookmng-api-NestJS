import { Injectable } from "@nestjs/common";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserLoginRepository } from "../repository/front-user-login.repository";
import { FrontUserLoginSelectEntity } from "../entity/front-user-login-select.entity";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { FrontUserLoginUserMasterSelectEntity } from "../entity/front-user-login-user-master-select.entit";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { NewJsonWebTokenModel } from "src/jsonwebtoken/model/NewJsonWebTokenModel";
import { ApiEndopoint } from "src/common/api/ApiEndpoint";

@Injectable()
export class FrontUserLoginService {

    constructor(private readonly frontUserLoginRepository: FrontUserLoginRepository) { }

    /**
     * ログイン情報を取得
     * @param frontUserNameModel 
     */
    async getLoginUser(frontUserNameModel: FrontUserNameModel) {

        const frontUserLoginSelectEntity = new FrontUserLoginSelectEntity(frontUserNameModel);

        const frontUserLoginList = await this.frontUserLoginRepository.getFrontLoginUser(frontUserLoginSelectEntity);

        return frontUserLoginList;
    }


    /**
     * ユーザー情報を取得
     * @param frontUserNameModel 
     */
    async getUserInfo(frontUserIdModel: FrontUserIdModel) {

        const frontUserLoginUserMasterSelectEntity = new FrontUserLoginUserMasterSelectEntity(frontUserIdModel);

        const frontUserMasterList = await this.frontUserLoginRepository.getFrontUserMaster(frontUserLoginUserMasterSelectEntity);

        return frontUserMasterList;
    }


    /**
     * jwtを作成する
     * @param userIdModel 
     * @param frontUserInfoCreateRequestBody 
     * @returns 
     */
    public createJsonWebToken(userIdModel: FrontUserIdModel,
        inputPasswordModel: FrontUserPasswordModel
    ) {

        try {
            const newJsonWebTokenModel = new NewJsonWebTokenModel(userIdModel, inputPasswordModel);

            return newJsonWebTokenModel;
        } catch (err) {
            throw Error(`${err} ENDPOINT:${ApiEndopoint.FRONT_USER_LOGIN}`);
        }
    }
}