import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { CreateBookshelfSelectBookshelfEntity } from "src/createbookshelf/entity/create-bookshelf-select-bookshelf.entity";
import { GetBookshelfTagEntity } from "../entity/get-bookshelf-tag.entity";
import { GetBookshelfTagSelectBookshelfEntity } from "../entity/get-bookshelf-tag-select-bookshelf.entity";
import { BookshelfTagTransaction } from "src/entities/BookshelfTagTransaction";
import { FLG } from "src/common/const/CommonConst";


@Injectable()
export class GetBookshelfTagRepository {


    constructor(
        @InjectRepository(BookshelfTransaction)
        private readonly bookshelfTransactionRepository: Repository<BookshelfTransaction>,
        @InjectRepository(BookshelfTagTransaction)
        private readonly bookshelfTagTransactionRepository: Repository<BookshelfTagTransaction>,
    ) { }

    /**
     * 本棚情報を取得
     * @param getBookshelfTagSelectBookshelfEntity 
     * @returns 
     */
    async getBookshelfList(getBookshelfTagSelectBookshelfEntity: GetBookshelfTagSelectBookshelfEntity) {

        const userId = getBookshelfTagSelectBookshelfEntity.frontUserId;
        const bookId = getBookshelfTagSelectBookshelfEntity.bookId;

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
     * タグを取得
     * @param getBookshelfListSelectBookshelfEntity 
     * @returns 
     */
    async getTag(getBookshelfTagEntity: GetBookshelfTagEntity) {

        const userId = getBookshelfTagEntity.frontUserId;
        const bookId = getBookshelfTagEntity.bookId;

        // タグを取得
        const result = await this.bookshelfTagTransactionRepository.find({
            where: {
                userId,
                bookId,
                deleteFlg: FLG.OFF
            }
        });

        return result;
    }
}