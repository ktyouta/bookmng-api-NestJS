import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { CreateBookshelfSelectBookshelfEntity } from "src/createbookshelf/entity/create-bookshelf-select-bookshelf.entity";
import { UpdateBookshelfStatusEntity } from "../entity/update-bookshelf-status.entity";


@Injectable()
export class UpdateBookshelfStatusRepository {


    constructor(
        @InjectRepository(BookshelfTransaction)
        private readonly bookshelfTransactionRepository: Repository<BookshelfTransaction>,
    ) { }

    /**
     * ステータスを更新
     * @param getBookshelfListSelectBookshelfEntity 
     * @returns 
     */
    async updateStatus(updateBookshelfStatusEntity: UpdateBookshelfStatusEntity) {

        const userId = updateBookshelfStatusEntity.frontUserId;
        const bookId = updateBookshelfStatusEntity.bookId;
        const readStatus = updateBookshelfStatusEntity.readStatus;
        const startDate = updateBookshelfStatusEntity.startDate;
        const endDate = updateBookshelfStatusEntity.endDate;
        const purchaseDate = updateBookshelfStatusEntity.purchaseDate;
        const favoriteLevel = updateBookshelfStatusEntity.favoriteLevel;
        console.log(`readStatus:${readStatus}`);
        console.log(`bookId:${bookId}`);
        // ステータスを更新
        const result = await this.bookshelfTransactionRepository.update(
            {
                userId,
                bookId
            },
            {
                readStatus: readStatus,
                startDate: startDate,
                endDate: endDate,
                purchaseDate: purchaseDate,
                favoriteLevel: favoriteLevel,
            });

        const updateCount = result.affected;

        if (!updateCount || updateCount === 0) {
            throw Error(`書籍ステータスの更新に失敗しました。`);
        }

        const bookshelf = await this.bookshelfTransactionRepository.findOneBy(
            {
                userId,
                bookId
            }
        );

        return bookshelf;
    }
}