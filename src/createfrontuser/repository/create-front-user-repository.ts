import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { CreateFrontUserSelectUserEntity } from "../entity/create-front-user-select-user.entity";
import { Injectable } from "@nestjs/common";

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
}