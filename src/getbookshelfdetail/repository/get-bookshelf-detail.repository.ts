import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { CreateBookshelfSelectBookshelfEntity } from "src/createbookshelf/entity/create-bookshelf-select-bookshelf.entity";
import { GetBookshelfDetailSelectBookshelfEntity } from "../entity/get-bookshelf-detail-select-bookshelf.entity";


@Injectable()
export class GetBookshelfDetailRepository {


    constructor(
        @InjectRepository(BookshelfTransaction)
        private readonly bookshelfTransactionRepository: Repository<BookshelfTransaction>,
    ) { }

    /**
     * 本棚情報を取得
     * @param getBookshelfListSelectBookshelfEntity 
     * @returns 
     */
    async getBookshelf(getBookshelfDetailSelectBookshelfEntity: GetBookshelfDetailSelectBookshelfEntity) {

        const userId = getBookshelfDetailSelectBookshelfEntity.frontUserId;
        const bookId = getBookshelfDetailSelectBookshelfEntity.bookId;

        // 本棚情報を取得
        const bookshelf = await this.bookshelfTransactionRepository.findOne({
            where: {
                userId,
                bookId
            }
        });

        return bookshelf;
    }
}