import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { TestConnection } from 'src/entities/TestConnection';
import { GoogleBooksApiBookDetailModel } from 'src/external/googlebooksapi/bookdetail/model/GoogleBooksApiBookDetailModel';
import { GoogleBooksApiBooksDeitalEndPointModel } from 'src/external/googlebooksapi/bookdetail/model/GoogleBooksApiBooksDeitalEndPointModel';
import { GoogleBooksApiBooksDeitalBookIdModel } from 'src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel';
import { GoogleBooksApiBookListModel } from 'src/external/googlebooksapi/booklist/model/GoogleBooksApiBookListModel';
import { GoogleBooksApiBooksListEndPointModel } from 'src/external/googlebooksapi/booklist/model/GoogleBooksApiBooksListEndPointModel';
import { GoogleBooksApiBookListKeyword } from 'src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword';
import { EntityManager, Repository } from 'typeorm';
import { UpdateBookshelfTagRepository } from '../repository/update-bookshelf-tag.repository';
import { FrontUserIdModel } from 'src/internal/common/FrontUserIdModel';
import { UpdateBookshelfTagInsertEntity } from '../entity/update-bookshelf-tag-insert.entity';
import { UpdateBookshelfTagRequestModel } from '../model/update-bookshelf-tag.request.model';
import { UpdateBookshelfTagSelectBookshelfEntity } from '../entity/update-bookshelf-tag-select-bookshelf.entity';
import { BookIdModel } from 'src/internal/bookshelftransaction/BookIdModel';
import { TagIdModel } from '../model/tag-id.model';
import { UpdateBookshelfTagDeleteEntity } from '../entity/update-bookshelf-tag-delete.entity';
import { TagListType } from '../type/tag-list.type';
import { UpdateBookshelfTagTagMasterInsertEntity } from '../entity/update-bookshelf-tag-tag-master-insert.entity';
import { UpdateBookshelfTagSelectTagSequenceEntity } from '../entity/update-bookshelf-tag-select-tag-sequence.entity';
import { TagSeqModel } from '../model/tag-seq.model';
import { TagNameModel } from '../model/tag-name.model';
import { UpdateBookshelfTagSelectBookshelfTagEntity } from '../entity/update-bookshelf-tag-select-bookshelf-tag.entity';
import { UpdateBookshelfTagDeleteTagMasterEntity } from '../entity/update-bookshelf-tag-delete-tag-master.entity';
import { UpdateBookshelfTagSelectTagMasterEntity } from '../entity/update-bookshelf-tag-select-tag-master.entity';


@Injectable()
export class UpdateBookshelfTagService {

    constructor(private readonly updateBookshelfTagRepository: UpdateBookshelfTagRepository) { }

    /**
     * 本棚情報を取得
     * @param userIdModel 
     * @param createBookshelfTagRequestModel 
     * @returns 
     */
    async getBookshelfList(userIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel,
    ) {

        const updateBookshelfTagSelectBookshelfEntity = new UpdateBookshelfTagSelectBookshelfEntity(
            userIdModel,
            bookIdModel
        );

        const bookshelfList = await this.updateBookshelfTagRepository.getBookshelfList(updateBookshelfTagSelectBookshelfEntity);

        return bookshelfList;
    }

    /**
     * タグを登録
     * @param bookIdModel 
     * @param statusModel 
     */
    async insertTag(userIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel,
        newTagList: TagListType[]) {


        const result = await Promise.all(newTagList.map(async (e: TagListType) => {

            const updateBookshelfTagInsertEntity = new UpdateBookshelfTagInsertEntity(
                userIdModel,
                bookIdModel,
                {
                    tagId: e.tagId,
                    tagName: e.tagName,
                },
            );

            const result = await this.updateBookshelfTagRepository.insertBookshelfTag(updateBookshelfTagInsertEntity);

            return result;
        }));

        return result;
    }

    /**
     * タグを削除
     * @param bookIdModel 
     * @param statusModel 
     */
    async deleteTag(userIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel,) {

        const updateBookshelfTagDeleteEntity = new UpdateBookshelfTagDeleteEntity(
            userIdModel,
            bookIdModel,
        );

        const result = await this.updateBookshelfTagRepository.deleteTag(updateBookshelfTagDeleteEntity);

        return result;
    }


    /**
     * タグマスタに登録
     * @param userIdModel 
     * @param updateBookshelfTagRequestModel 
     */
    async insertTagMaster(userIdModel: FrontUserIdModel,
        updateBookshelfTagRequestModel: UpdateBookshelfTagRequestModel) {

        const tagList = updateBookshelfTagRequestModel.tagList;
        const updateBookshelfTagSelectTagSequenceEntity = new UpdateBookshelfTagSelectTagSequenceEntity(userIdModel);
        const newTagList: TagListType[] = [];

        for (const tag of tagList) {

            if (tag.tagId.tagId) {

                newTagList.push({
                    tagId: tag.tagId,
                    tagName: tag.tagName,
                });
                continue;
            }

            // タグマスタ取得
            const updateBookshelfTagSelectTagMasterEntity = new UpdateBookshelfTagSelectTagMasterEntity(
                userIdModel,
                tag.tagName
            );

            const tagMasterList = await this.updateBookshelfTagRepository.getTagMaster(updateBookshelfTagSelectTagMasterEntity);

            // タグマスタに登録済み
            if (tagMasterList && tagMasterList.length > 0) {
                continue;
            }

            // シーケンス番号取得
            const nextSeq = await this.updateBookshelfTagRepository.getTagSeq(updateBookshelfTagSelectTagSequenceEntity);

            // タグマスタ登録
            const updateBookshelfTagTagMasterInsertEntity = new UpdateBookshelfTagTagMasterInsertEntity(
                userIdModel,
                tag.tagName,
                new TagSeqModel(nextSeq)
            );

            const result = await this.updateBookshelfTagRepository.insertTagMaster(updateBookshelfTagTagMasterInsertEntity);

            newTagList.push({
                tagId: new TagIdModel(result.tagId.toString()),
                tagName: new TagNameModel(result.tagName)
            });
        }

        return newTagList;
    }

    /**
     * レスポンス用のタグリストを取得
     * @param userIdModel 
     * @param bookIdModel 
     * @returns 
     */
    async getResponseTagList(userIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel,
    ) {

        const updateBookshelfTagSelectBookshelfTagEntity = new UpdateBookshelfTagSelectBookshelfTagEntity(
            userIdModel,
            bookIdModel
        );

        const bookshelfTagList = await this.updateBookshelfTagRepository.getResponseTagList(updateBookshelfTagSelectBookshelfTagEntity);

        return bookshelfTagList;
    }

    /**
     * 未使用のタグをマスタから削除
     * @param userIdModel 
     * @param bookIdModel 
     * @returns 
     */
    async deleteNoUsedTag(userIdModel: FrontUserIdModel,) {

        const updateBookshelfTagDeleteTagMasterEntity = new UpdateBookshelfTagDeleteTagMasterEntity(
            userIdModel,
        );

        await this.updateBookshelfTagRepository.deleteNoUsedTag(updateBookshelfTagDeleteTagMasterEntity);
    }
}
