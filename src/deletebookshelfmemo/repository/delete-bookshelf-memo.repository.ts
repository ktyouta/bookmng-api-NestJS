import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { CreateBookshelfSelectBookshelfEntity } from "src/createbookshelf/entity/create-bookshelf-select-bookshelf.entity";
import { DeleteBookshelfMemoEntity } from "../entity/delete-bookshelf-memo.entity";
import { DeleteBookshelfMemoSelectBookshelfEntity } from "../entity/delete-bookshelf-memo-select-bookshelf.entity";
import { BookshelfMemoTransaction } from "src/entities/BookshelfMemoTransaction";


@Injectable()
export class DeleteBookshelfMemoRepository {


    constructor(
        @InjectRepository(BookshelfTransaction)
        private readonly bookshelfTransactionRepository: Repository<BookshelfTransaction>,
        @InjectRepository(BookshelfMemoTransaction)
        private readonly bookshelfMemoTransactionRepository: Repository<BookshelfMemoTransaction>,
    ) { }

    /**
     * 本棚情報を取得
     * @param deleteBookshelfMemoSelectBookshelfEntity 
     * @returns 
     */
    async getBookshelfList(deleteBookshelfMemoSelectBookshelfEntity: DeleteBookshelfMemoSelectBookshelfEntity) {

        const userId = deleteBookshelfMemoSelectBookshelfEntity.frontUserId;
        const bookId = deleteBookshelfMemoSelectBookshelfEntity.bookId;

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
     * メモを削除
     * @param getBookshelfListSelectBookshelfEntity 
     * @returns 
     */
    async deleteMemo(deleteBookshelfMemoEntity: DeleteBookshelfMemoEntity) {

        const userId = deleteBookshelfMemoEntity.frontUserId;
        const bookId = deleteBookshelfMemoEntity.bookId;
        const memoId = deleteBookshelfMemoEntity.memoId;

        // メモを削除
        const result = await this.bookshelfMemoTransactionRepository.delete(
            {
                userId,
                bookId,
                seq: memoId
            });

        return result;
    }
}