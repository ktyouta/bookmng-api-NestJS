import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { CreateBookshelfSelectBookshelfEntity } from "src/createbookshelf/entity/create-bookshelf-select-bookshelf.entity";
import { UpdateBookshelfMemoEntity } from "../entity/update-bookshelf-memo.entity";
import { UpdateBookshelfMemoSelectBookshelfEntity } from "../entity/update-bookshelf-memo-select-bookshelf.entity";
import { BookshelfMemoTransaction } from "src/entities/BookshelfMemoTransaction";


@Injectable()
export class UpdateBookshelfMemoRepository {


    constructor(
        @InjectRepository(BookshelfTransaction)
        private readonly bookshelfTransactionRepository: Repository<BookshelfTransaction>,
        @InjectRepository(BookshelfMemoTransaction)
        private readonly bookshelfMemoTransactionRepository: Repository<BookshelfMemoTransaction>,
    ) { }

    /**
     * 本棚情報を取得
     * @param updateBookshelfMemoSelectBookshelfEntity 
     * @returns 
     */
    async getBookshelfList(updateBookshelfMemoSelectBookshelfEntity: UpdateBookshelfMemoSelectBookshelfEntity) {

        const userId = updateBookshelfMemoSelectBookshelfEntity.frontUserId;
        const bookId = updateBookshelfMemoSelectBookshelfEntity.bookId;

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
     * メモを更新
     * @param getBookshelfListSelectBookshelfEntity 
     * @returns 
     */
    async updateStatus(updateBookshelfMemoEntity: UpdateBookshelfMemoEntity) {

        const userId = updateBookshelfMemoEntity.frontUserId;
        const bookId = updateBookshelfMemoEntity.bookId;
        const memoId = updateBookshelfMemoEntity.memoId;
        const memo = updateBookshelfMemoEntity.memo;

        // メモを更新
        const result = await this.bookshelfMemoTransactionRepository.update(
            {
                userId,
                bookId,
                seq: memoId
            },
            {
                memo,
            });

        const updateCount = result.affected;

        if (!updateCount || updateCount === 0) {
            throw Error(`書籍メモの更新に失敗しました。`);
        }

        const bookshelf = await this.bookshelfMemoTransactionRepository.findOneBy(
            {
                userId,
                bookId,
                seq: memoId
            }
        );

        return bookshelf;
    }
}