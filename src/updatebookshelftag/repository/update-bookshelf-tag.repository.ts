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
import { UpdateBookshelfTagTagMasterInsertEntity } from "../entity/update-bookshelf-tag-tag-master-insert.entity";
import { TagMaster } from "src/entities/TagMaster";


@Injectable()
export class UpdateBookshelfTagRepository {


    constructor(
        @InjectRepository(BookshelfTransaction)
        private readonly bookshelfTransactionRepository: Repository<BookshelfTransaction>,
        @InjectRepository(BookshelfTagTransaction)
        private readonly bookshelfTagTransactionRepository: Repository<BookshelfTagTransaction>,
        @InjectRepository(TagMaster)
        private readonly tagMasterRepository: Repository<TagMaster>,
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
                tagId: tag.tagId.tagId,
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
        const tag = updateBookshelfTagTagMasterInsertEntity.tag;

        // タグを登録
        const result = await this.tagMasterRepository.insert(
            {
                userId,
                tagId: tag.tagId.tagId,
                tagName: tag.tagName.tagName,
                deleteFlg: DeleteFlgModel.OFF,
                createDate: new Date(),
                updateDate: new Date(),
            },
        );

        return result;
    }
}