import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { CreateBookshelfSelectBookshelfEntity } from "src/createbookshelf/entity/create-bookshelf-select-bookshelf.entity";
import { GetBookshelfListSelectBookshelfEntity } from "../entity/get-bookshelf-list-select-bookshelf.entity";
import { BookshelfType } from "../type/bookshelf.type";


@Injectable()
export class GetBookshelfListRepository {

    // ソートクエリ(メモ登録数)
    private static readonly SORT_MEMO = `(
                    SELECT
                        count(*)
                    FROM
                        bookmng.bookshelf_memo_transaction d
                    WHERE
                        d.user_id = $1 AND
                        d.book_id = a.book_id AND
                        d.delete_flg = '0'
                )`;

    constructor(
        @InjectRepository(BookshelfTransaction)
        private readonly entityManager: EntityManager,
    ) { }

    /**
     * 本棚情報を取得
     * @param getBookshelfListSelectBookshelfEntity 
     * @returns 
     */
    async getBookshelfList(getBookshelfListSelectBookshelfEntity: GetBookshelfListSelectBookshelfEntity) {

        const userId = getBookshelfListSelectBookshelfEntity.frontUserId;
        const readStatus = getBookshelfListSelectBookshelfEntity.readStatus;
        const favoriteLevel = getBookshelfListSelectBookshelfEntity.favoriteLevel;
        const sortKey = getBookshelfListSelectBookshelfEntity.sortKey;

        // 本棚情報を取得
        const params: unknown[] = [userId];
        let paramIndex = 2;
        let query = `
            SELECT 
                user_id as "userId",
                book_id  as "bookId",
                review,
                summary,
                read_status as "readStatus",
                start_date as "startDate",
                end_date as "endDate",
                purchase_date as "purchaseDate",
                favorite_level as "favoriteLevel",
                delete_flg as "deleteFlg",
                create_date as "createDate",
                update_date as "updateDate"
            FROM 
                bookmng.bookshelf_transaction a
            WHERE
                delete_flg = '0' AND
                user_id = $1
        `;

        if (readStatus) {
            query += ` AND read_status = $${paramIndex}`;
            paramIndex++;
            params.push(readStatus);
        }

        if (favoriteLevel) {
            query += ` AND favorite_level = $${paramIndex}`;
            paramIndex++;
            params.push(favoriteLevel);
        }

        query += ` ORDER BY `

        // ソート
        switch (sortKey) {
            case `0`:
                query += `a.update_date DESC`;
                break;
            case `1`:
                query += `a.update_date`;
                break;
            case `2`:
                query += `a.create_date DESC`;
                break;
            case `3`:
                query += `a.create_date`;
                break;
            case `4`:
                query += `${GetBookshelfListRepository.SORT_MEMO} desc, a.update_date DESC`;
                break;
            case `5`:
                query += `${GetBookshelfListRepository.SORT_MEMO}, a.update_date DESC`;
                break;
            case `6`:
                query += `a.favorite_level desc, a.update_date DESC`;
                break;
            case `7`:
                query += `a.favorite_level, a.update_date DESC`;
                break;
            default:
                query += `update_date DESC`;
                break;
        }

        // 本棚情報を取得
        const bookshelfList: BookshelfType[] = await this.entityManager.query(
            query,
            params
        );

        return bookshelfList;
    }
}