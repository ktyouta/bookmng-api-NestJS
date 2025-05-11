import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { JsonWebTokenUserInfoSelectEntity } from "../entity/JsonWebTokenUserInfoSelectEntity";
import { FrontUserInfoType } from "../type/FrontUserInfoType";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";


@Injectable()
export class JsonWebTokenUserInfoRepositoryJson {

    constructor(private readonly entityManager: EntityManager,) { }

    /**
     * ユーザー取得
     * @returns 
     */
    async select(jsonWebTokenUserInfoSelectEntity: JsonWebTokenUserInfoSelectEntity):
        Promise<FrontUserInfoType[]> {

        const userId = jsonWebTokenUserInfoSelectEntity.frontUserId;
        const password = jsonWebTokenUserInfoSelectEntity.frontUserPassword;

        // ユーザー情報を取得
        const frontUserList = await this.entityManager.query(
            `SELECT 
                *
            FROM bookmng.front_user_login_master a 
            INNER JOIN bookmng.front_user_info_master b
            ON a.user_id = CAST(${userId} AS INTEGER) AND
            a.password = ${password} AND
            a.delete_flg = ${DeleteFlgModel.OFF} AND
            a.user_id = b.user_id`
        );

        return frontUserList;
    }

}