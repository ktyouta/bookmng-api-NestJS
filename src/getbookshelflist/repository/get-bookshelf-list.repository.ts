import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { CreateBookshelfSelectBookshelfEntity } from "src/createbookshelf/entity/create-bookshelf-select-bookshelf.entity";
import { GetBookshelfListSelectBookshelfEntity } from "../entity/get-bookshelf-list-select-bookshelf.entity";


@Injectable()
export class GetBookshelfListRepository {


    constructor(
        @InjectRepository(BookshelfTransaction)
        private readonly bookshelfTransactionRepository: Repository<BookshelfTransaction>,
    ) { }

    /**
     * 本棚情報を取得
     * @param getBookshelfListSelectBookshelfEntity 
     * @returns 
     */
    async getBookshelfList(getBookshelfListSelectBookshelfEntity: GetBookshelfListSelectBookshelfEntity) {

        const userId = getBookshelfListSelectBookshelfEntity.frontUserId;

        // 本棚情報を取得
        const bookshelfList = await this.bookshelfTransactionRepository.find({
            where: {
                userId,
            },
            order: {
                updateDate: `DESC`
            }
        });

        return bookshelfList;
    }
}