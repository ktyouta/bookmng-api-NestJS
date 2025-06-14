import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { CreateBookshelfSelectBookshelfEntity } from "src/createbookshelf/entity/create-bookshelf-select-bookshelf.entity";
import { UpdateBookshelfSummaryEntity } from "../entity/update-bookshelf-summary.entity";


@Injectable()
export class UpdateBookshelfSummaryRepository {


    constructor(
        @InjectRepository(BookshelfTransaction)
        private readonly bookshelfTransactionRepository: Repository<BookshelfTransaction>,
    ) { }

    /**
     * 要約を更新
     * @param getBookshelfListSelectBookshelfEntity 
     * @returns 
     */
    async updateSummary(updateBookshelfSummaryEntity: UpdateBookshelfSummaryEntity) {

        const userId = updateBookshelfSummaryEntity.frontUserId;
        const bookId = updateBookshelfSummaryEntity.bookId;
        const summary = updateBookshelfSummaryEntity.summary;

        // 要約を更新
        const bookshelf = await this.bookshelfTransactionRepository.update(
            { userId, bookId },
            { summary: summary });

        return bookshelf;
    }
}