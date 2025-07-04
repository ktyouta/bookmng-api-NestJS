import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { CreateBookshelfSelectBookshelfEntity } from "src/createbookshelf/entity/create-bookshelf-select-bookshelf.entity";
import { ReadStatusMaster } from "src/entities/ReadStatusMaster";
import { BookshelfSortMaster } from "src/entities/BookshelfSortMaster";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { TagMaster } from "src/entities/TagMaster";


@Injectable()
export class GetTagListRepository {


    constructor(
        @InjectRepository(TagMaster)
        private readonly bookshelfSortMasterRepository: Repository<TagMaster>,
    ) { }

    /**
     * タグリストを取得
     * @param getTagListSelectBookshelfEntity 
     * @returns 
     */
    async getTagList(userIdModel: FrontUserIdModel) {

        const userId = userIdModel.frontUserId

        const tagList = await this.bookshelfSortMasterRepository.find({
            where: {
                userId
            },
            order: {
                tagId: `ASC`
            }
        });

        return tagList;
    }
}