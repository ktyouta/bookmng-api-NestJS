import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { CreateBookshelfSelectBookshelfEntity } from "src/createbookshelf/entity/create-bookshelf-select-bookshelf.entity";
import { GetBookshelfMemoEntity } from "../entity/get-bookshelf-memo.entity";
import { GetBookshelfMemoSelectBookshelfEntity } from "../entity/get-bookshelf-memo-select-bookshelf.entity";
import { BookshelfMemoTransaction } from "src/entities/BookshelfMemoTransaction";
import { FLG } from "src/common/const/CommonConst";


@Injectable()
export class GetBookshelfMemoRepository {


    constructor(
        @InjectRepository(BookshelfTransaction)
        private readonly bookshelfTransactionRepository: Repository<BookshelfTransaction>,
        @InjectRepository(BookshelfMemoTransaction)
        private readonly bookshelfMemoTransactionRepository: Repository<BookshelfMemoTransaction>,
    ) { }

    /**
     * 本棚情報を取得
     * @param getBookshelfMemoSelectBookshelfEntity 
     * @returns 
     */
    async getBookshelfList(getBookshelfMemoSelectBookshelfEntity: GetBookshelfMemoSelectBookshelfEntity) {

        const userId = getBookshelfMemoSelectBookshelfEntity.frontUserId;
        const bookId = getBookshelfMemoSelectBookshelfEntity.bookId;

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
     * メモを取得
     * @param getBookshelfListSelectBookshelfEntity 
     * @returns 
     */
    async getMemo(getBookshelfMemoEntity: GetBookshelfMemoEntity) {

        const userId = getBookshelfMemoEntity.frontUserId;
        const bookId = getBookshelfMemoEntity.bookId;

        // メモを取得
        const result = await this.bookshelfMemoTransactionRepository.find({
            where: {
                userId,
                bookId,
                deleteFlg: FLG.OFF
            }
        });

        return result;
    }
}