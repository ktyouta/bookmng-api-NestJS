import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { CreateBookshelfSelectBookshelfEntity } from "../entity/create-bookshelf-select-bookshelf.entity";
import { CreateBookshelfCreateBookshelfEntity } from "../entity/create-bookshelf-create-bookshelf.entity";

@Injectable()
export class CreateBookshelfRepository {


    constructor(
        @InjectRepository(BookshelfTransaction)
        private readonly bookshelfTransactionRepository: Repository<BookshelfTransaction>,
    ) { }

    /**
     * 本棚情報を取得
     * @param createBookshelfSelectBookshelfEntity 
     * @returns 
     */
    async getBookshelfList(createBookshelfSelectBookshelfEntity: CreateBookshelfSelectBookshelfEntity) {

        const userId = createBookshelfSelectBookshelfEntity.frontUserId;
        const bookId = createBookshelfSelectBookshelfEntity.bookId;

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
     * 本棚情報を登録
     * @param createBookshelfCreateBookshelfEntity 
     * @returns 
     */
    async createBookshelf(createBookshelfCreateBookshelfEntity: CreateBookshelfCreateBookshelfEntity) {

        const userId = createBookshelfCreateBookshelfEntity.frontUserId;
        const bookId = createBookshelfCreateBookshelfEntity.bookId;

        // 本棚情報作成
        const bookshelf = await this.bookshelfTransactionRepository.insert({
            userId,
            bookId,
            createDate: new Date(),
            updateDate: new Date(),
            deleteFlg: DeleteFlgModel.OFF,
        });

        return bookshelf;
    }
}