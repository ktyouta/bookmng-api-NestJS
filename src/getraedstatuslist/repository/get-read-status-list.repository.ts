import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { CreateBookshelfSelectBookshelfEntity } from "src/createbookshelf/entity/create-bookshelf-select-bookshelf.entity";
import { ReadStatusMaster } from "src/entities/ReadStatusMaster";


@Injectable()
export class GetReadStatusListRepository {


    constructor(
        @InjectRepository(ReadStatusMaster)
        private readonly readStatusMasterRepository: Repository<ReadStatusMaster>,
    ) { }

    /**
     * 読書状況一覧を取得
     * @param getReadStatusListSelectBookshelfEntity 
     * @returns 
     */
    async getReadStatusList() {

        const readStatusList = await this.readStatusMasterRepository.find({
            order: {
                id: `ASC`
            }
        });

        return readStatusList;
    }
}