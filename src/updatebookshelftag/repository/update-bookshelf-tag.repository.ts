import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { CreateBookshelfSelectBookshelfEntity } from "src/createbookshelf/entity/create-bookshelf-select-bookshelf.entity";
import { UpdateBookshelfTagSelectBookshelfEntity } from "../entity/update-bookshelf-tag-select-bookshelf.entity";
import { BookshelfTagTransaction } from "src/entities/BookshelfTagTransaction";
import { UpdateBookshelfTagDeleteEntity } from "../entity/update-bookshelf-tag-delete.entity";
import { UpdateBookshelfTagInsertEntity } from "../entity/update-bookshelf-tag-insert.entity";
import { UpdateBookshelfTagTagMasterInsertEntity } from "../entity/update-bookshelf-tag-tag-master-insert.entity";
import { TagMaster } from "src/entities/TagMaster";
import { UpdateBookshelfTagSelectTagSequenceEntity } from "../entity/update-bookshelf-tag-select-tag-sequence.entity";
import { UpdateBookshelfTagSelectBookshelfTagEntity } from "../entity/update-bookshelf-tag-select-bookshelf-tag.entity";
import { ResponseTagType } from "../type/response-tag.type";
import { UpdateBookshelfTagDeleteTagMasterEntity } from "../entity/update-bookshelf-tag-delete-tag-master.entity";


@Injectable()
export class UpdateBookshelfTagRepository {


    constructor(
        @InjectRepository(BookshelfTransaction)
        private readonly bookshelfTransactionRepository: Repository<BookshelfTransaction>,
        @InjectRepository(BookshelfTagTransaction)
        private readonly bookshelfTagTransactionRepository: Repository<BookshelfTagTransaction>,
        @InjectRepository(TagMaster)
        private readonly tagMasterRepository: Repository<TagMaster>,
        private readonly entityManager: EntityManager,
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
     * 本棚タグを登録
     * @param getBookshelfListSelectBookshelfEntity 
     * @returns 
     */
    async insertBookshelfTag(updateBookshelfTagInsertEntity: UpdateBookshelfTagInsertEntity) {

        const userId = updateBookshelfTagInsertEntity.frontUserId;
        const bookId = updateBookshelfTagInsertEntity.bookId;
        const tag = updateBookshelfTagInsertEntity.tag;

        // タグを登録
        const result = await this.bookshelfTagTransactionRepository.insert(
            {
                userId,
                bookId,
                tagId: Number.parseInt(tag.tagId.tagId),
                deleteFlg: DeleteFlgModel.OFF,
                createDate: new Date(),
                updateDate: new Date(),
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


    /**
     * タグマスタに登録
     * @param getBookshelfListSelectBookshelfEntity 
     * @returns 
     */
    async insertTagMaster(updateBookshelfTagTagMasterInsertEntity: UpdateBookshelfTagTagMasterInsertEntity) {

        const userId = updateBookshelfTagTagMasterInsertEntity.frontUserId;
        const tagName = updateBookshelfTagTagMasterInsertEntity.tagName;
        const tagId = updateBookshelfTagTagMasterInsertEntity.tagSeq;

        // タグを登録
        const result = await this.tagMasterRepository.save(
            {
                userId,
                tagId: tagId,
                tagName: tagName,
                deleteFlg: DeleteFlgModel.OFF,
                createDate: new Date(),
                updateDate: new Date(),
            },
        );

        return result;
    }

    /**
     * タグマスタのシーケンス取得
     * @param getBookshelfListSelectBookshelfEntity 
     * @returns 
     */
    async getTagSeq(updateBookshelfTagSelectTagSequenceEntity: UpdateBookshelfTagSelectTagSequenceEntity) {

        const params: unknown[] = [
            updateBookshelfTagSelectTagSequenceEntity.frontUserId,
        ];

        let query = `
            SELECT 
                COALESCE(MAX(tag_id),0) + 1 as next_seq
            FROM 
                bookmng.tag_master  
            WHERE
                user_id = $1
        `;

        // シーケンスを取得
        const result = await this.entityManager.query(
            query,
            params
        );

        const nextSeq: number = result[0].next_seq;

        return nextSeq;
    }

    /**
     * レスポンス用のタグ情報を取得
     * @param updateBookshelfTagSelectBookshelfTagEntity 
     * @returns 
     */
    async getResponseTagList(updateBookshelfTagSelectBookshelfTagEntity: UpdateBookshelfTagSelectBookshelfTagEntity) {

        const userId = updateBookshelfTagSelectBookshelfTagEntity.frontUserId;
        const bookId = updateBookshelfTagSelectBookshelfTagEntity.bookId;

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

    /**
     * 未使用のタグをマスタから削除
     * @param updateBookshelfTagDeleteTagMasterEntity 
     * @returns 
     */
    async deleteNoUsedTag(updateBookshelfTagDeleteTagMasterEntity: UpdateBookshelfTagDeleteTagMasterEntity) {

        const userId = updateBookshelfTagDeleteTagMasterEntity.frontUserId;

        const params: unknown[] = [
            userId,
        ];

        const query = `
            DELETE
            FROM
                bookmng.tag_master a
            WHERE
                a.user_id = $1 AND
                NOT EXISTS(
                    SELECT
                        *
                    FROM
                        bookmng.bookshelf_tag_transaction b
                    WHERE
                        b.user_id = $1 AND
                        b.tag_id = a.tag_id
                )
        `;

        await this.entityManager.query(
            query,
            params
        );
    }
}