import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { CreateFrontUserSelectUserEntity } from "../entity/create-front-user-select-user.entity";
import { Injectable } from "@nestjs/common";
import { CreateFrontUserCreateLoginEntity } from "../entity/create-front-user-create-login.entity";
import { FrontUserInfoMaster } from "src/entities/FrontUserInfoMaster";
import { CreateFrontUserCreateUserMasterEntity } from "../entity/create-front-user-create-user-master.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";

@Injectable()
export class CreateFrontUserRepository {


    constructor(
        @InjectRepository(FrontUserLoginMaster)
        private readonly frontUserLoginMasterRepository: Repository<FrontUserLoginMaster>,
        @InjectRepository(FrontUserInfoMaster)
        private readonly frontUserInfoMasterRepository: Repository<FrontUserInfoMaster>,
    ) { }

    /**
     * フロントユーザーログイン情報を取得
     * @param createFrontUserSelectUserEntity 
     * @returns 
     */
    async getFrontUser(createFrontUserSelectUserEntity: CreateFrontUserSelectUserEntity) {

        const userName = createFrontUserSelectUserEntity.frontUserName;

        // ログイン情報を取得
        const frontUserLoginList = await this.frontUserLoginMasterRepository.find({
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

        const userId = createFrontUserCreateLoginEntity.frontUserId;
        const userName = createFrontUserCreateLoginEntity.frontUserName;
        const password = createFrontUserCreateLoginEntity.frontUserPassword;
        const salt = createFrontUserCreateLoginEntity.salt;

        // ログイン情報作成
        const userLoginInfo = await this.frontUserLoginMasterRepository.insert({
            userId,
            password,
            userName,
            salt,
            createDate: new Date(),
            updateDate: new Date(),
            deleteFlg: DeleteFlgModel.OFF,
        });

        return userLoginInfo;
    }


    /**
     * ユーザーマスタ情報作成
     * @param createFrontUserCreateUserMasterEntity 
     */
    async createUserMasterInfo(createFrontUserCreateUserMasterEntity: CreateFrontUserCreateUserMasterEntity) {

        const userId = createFrontUserCreateUserMasterEntity.frontUserId;
        const userName = createFrontUserCreateUserMasterEntity.frontUserName;
        const userBirthday = createFrontUserCreateUserMasterEntity.frontUserBirthDay;

        // ユーザー情報作成
        const userMasterInfo = await this.frontUserInfoMasterRepository.insert({
            userId,
            userName,
            userBirthday,
            createDate: new Date(),
            updateDate: new Date(),
            deleteFlg: DeleteFlgModel.OFF,
        });

        return userMasterInfo;
    }
}