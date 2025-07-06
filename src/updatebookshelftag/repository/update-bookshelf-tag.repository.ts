import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { CreateBookshelfSelectBookshelfEntity } from "src/createbookshelf/entity/create-bookshelf-select-bookshelf.entity";
import { UpdateBookshelfTagSelectBookshelfEntity } from "../entity/update-bookshelf-tag-select-bookshelf.entity";
import { BookshelfTagTransaction } from "src/entities/BookshelfTagTransaction";
import { UpdateBookshelfTagDeleteEntity } from "../entity/update-bookshelf-tag-delete.entity";
import { UpdateBookshelfTagInsertEntity } from "../entity/update-bookshelf-tag-insert.entity";


@Injectable()
export class UpdateBookshelfTagRepository {


    constructor(
        @InjectRepository(BookshelfTransaction)
        private readonly bookshelfTransactionRepository: Repository<BookshelfTransaction>,
        @InjectRepository(BookshelfTagTransaction)
        private readonly bookshelfTagTransactionRepository: Repository<BookshelfTagTransaction>,
    ) { }

    /**
     * 本棚情報を取得
     * @param updateBookshelfTagSelectBookshelfEntity 
     * @returns 
     */
    async getBookshelfList(updateBookshelfTagSelectBookshelfEntity: UpdateBookshelfTagSelectBookshelfEntity) {

        const userId = updateBookshelfTagSelectBookshelfEntity.frontUserId;
        const bookId = updateBookshelfTagSelectBookshelfEntity.bookId;

        // 本棚情報を取得
        const bookshelfList = await this.bookshelfTransactionRepository.find({
            where: {
                userId,
                bookId
            },
        });

        return bookshelfList;
    }

    /**
     * タグを登録
     * @param getBookshelfListSelectBookshelfEntity 
     * @returns 
     */
    async updateTag(updateBookshelfTagInsertEntity: UpdateBookshelfTagInsertEntity) {

        const userId = updateBookshelfTagInsertEntity.frontUserId;
        const bookId = updateBookshelfTagInsertEntity.bookId;

        // タグを更新
        const result = await this.bookshelfTagTransactionRepository.insert(
            {
                userId,
                bookId,
            },
        );

        return result;
    }

    /**
     * タグを削除
     * @param updateBookshelfTagDeleteEntity 
     * @returns 
     */
    async deleteTag(updateBookshelfTagDeleteEntity: UpdateBookshelfTagDeleteEntity) {

        const userId = updateBookshelfTagDeleteEntity.frontUserId;
        const bookId = updateBookshelfTagDeleteEntity.bookId;

        // タグを更新
        const result = await this.bookshelfTagTransactionRepository.delete(
            {
                userId,
                bookId,
            }
        );

        return result;
    }
}