import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { Injectable } from "@nestjs/common";
import { FrontUserInfoMaster } from "src/entities/FrontUserInfoMaster";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";
import { FrontUserLoginSelectEntity } from "../entity/front-user-login-select.entity";

@Injectable()
export class FrontUserLoginRepository {


    constructor(
        @InjectRepository(FrontUserLoginMaster)
        private readonly frontUserLoginMasterRepository: Repository<FrontUserLoginMaster>,
        @InjectRepository(FrontUserInfoMaster)
        private readonly frontUserInfoMasterRepository: Repository<FrontUserInfoMaster>,
    ) { }

    /**
     * フロントユーザーログイン情報を取得
     * @param frontUserLoginSelectEntity 
     * @returns 
     */
    async getFrontLoginUser(frontUserLoginSelectEntity: FrontUserLoginSelectEntity) {

        const userName = frontUserLoginSelectEntity.frontUserName;

        // ログイン情報を取得
        const frontUserLoginList = await this.frontUserLoginMasterRepository.find({
            where: {
                userName: userName,
            },
        });

        return frontUserLoginList;
    }
}