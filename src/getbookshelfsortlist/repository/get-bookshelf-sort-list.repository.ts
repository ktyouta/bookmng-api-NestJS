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


@Injectable()
export class GetBookshelfSortListRepository {


    constructor(
        @InjectRepository(BookshelfSortMaster)
        private readonly bookshelfSortMasterRepository: Repository<BookshelfSortMaster>,
    ) { }

    /**
     * 本棚ソートリストを取得
     * @param getBookshelfSortListSelectBookshelfEntity 
     * @returns 
     */
    async getBookshelfSortList() {

        const bookshelfSortList = await this.bookshelfSortMasterRepository.find({
            order: {
                id: `ASC`
            }
        });

        return bookshelfSortList;
    }
}