import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { CreateFrontUserSelectUserEntity } from "../entity/create-front-user-select-user.entity";
import { Injectable } from "@nestjs/common";
import { CreateFrontUserCreateLoginEntity } from "../entity/create-front-user-create-login.entity";

@Injectable()
export class CreateFrontUserRepository {

    /**
     * フロントユーザーログイン情報を取得
     * @param createFrontUserSelectUserEntity 
     * @returns 
     */
    async getFrontUser(createFrontUserSelectUserEntity: CreateFrontUserSelectUserEntity) {

        const frontUserLoginMasterRepository = TypeOrmRepository.get(FrontUserLoginMaster);
        const userName = createFrontUserSelectUserEntity.frontUserName;

        // ログイン情報を取得
        const frontUserLoginList = await frontUserLoginMasterRepository.find({
            where: {
                userName: userName,
            },
        });

        return frontUserLoginList;
    }


    /**
     * ユーザーログイン情報作成
     * @param createFrontUserCreateLoginEntity 
     */
    async createUserLoginInfo(createFrontUserCreateLoginEntity: CreateFrontUserCreateLoginEntity) {

        const frontUserLoginMasterRepository = TypeOrmRepository.get(FrontUserLoginMaster);
        const userId = createFrontUserCreateLoginEntity.frontUserId;
        const userName = createFrontUserCreateLoginEntity.frontUserName;
        const password = createFrontUserCreateLoginEntity.frontUserPassword;
        const salt = createFrontUserCreateLoginEntity.salt;

        // ログイン情報作成
        const userLoginInfo = await frontUserLoginMasterRepository.insert({
            userId,
            password,
            userName,
            salt,
        });

        return userLoginInfo;
    }
}