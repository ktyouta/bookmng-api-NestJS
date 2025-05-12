import { Injectable } from "@nestjs/common";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserLoginRepository } from "../repository/front-user-login.repository";
import { FrontUserLoginSelectEntity } from "../entity/front-user-login-select.entity";

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
}