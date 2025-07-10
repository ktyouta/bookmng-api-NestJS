import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { CreateBookshelfSelectBookshelfEntity } from "src/createbookshelf/entity/create-bookshelf-select-bookshelf.entity";
import { GetBookshelfTagEntity } from "../entity/get-bookshelf-tag.entity";
import { GetBookshelfTagSelectBookshelfEntity } from "../entity/get-bookshelf-tag-select-bookshelf.entity";
import { BookshelfTagTransaction } from "src/entities/BookshelfTagTransaction";
import { FLG } from "src/common/const/CommonConst";
import { ResponseTagType } from "../type/response-tag.type";


@Injectable()
export class GetBookshelfTagRepository {


    constructor(
        @InjectRepository(BookshelfTransaction)
        private readonly bookshelfTransactionRepository: Repository<BookshelfTransaction>,
        private readonly entityManager: EntityManager,
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

        const params: unknown[] = [
            userId,
            bookId,
        ];

        const query = `
            SELECT 
                a.tag_id as "tagId",
                b.tag_name as "tagName"
            FROM 
                bookmng.bookshelf_tag_transaction  a
            INNER JOIN
                bookmng.tag_master b
            ON
                a.tag_id = b.tag_id
            WHERE
                a.user_id = $1 and
                a.book_id = $2
        `;

        // 本棚タグ情報を取得
        const bookshelfTagList: ResponseTagType[] = await this.entityManager.query(
            query,
            params
        );

        return bookshelfTagList;
    }
}