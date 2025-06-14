import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { CreateBookshelfSelectBookshelfEntity } from "src/createbookshelf/entity/create-bookshelf-select-bookshelf.entity";
import { UpdateBookshelfReviewEntity } from "../entity/update-bookshelf-review.entity";


@Injectable()
export class UpdateBookshelfReviewRepository {


    constructor(
        @InjectRepository(BookshelfTransaction)
        private readonly bookshelfTransactionRepository: Repository<BookshelfTransaction>,
    ) { }

    /**
     * レビューを更新
     * @param getBookshelfListSelectBookshelfEntity 
     * @returns 
     */
    async updateReview(updateBookshelfReviewEntity: UpdateBookshelfReviewEntity) {

        const userId = updateBookshelfReviewEntity.frontUserId;
        const bookId = updateBookshelfReviewEntity.bookId;
        const review = updateBookshelfReviewEntity.review;

        // レビューを更新
        const bookshelf = await this.bookshelfTransactionRepository.update(
            { userId, bookId },
            { review: review });

        return bookshelf;
    }
}