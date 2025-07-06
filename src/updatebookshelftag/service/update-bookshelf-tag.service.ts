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
        updateBookshelfTagRequestModel: UpdateBookshelfTagRequestModel) {


        const result = await Promise.all(updateBookshelfTagRequestModel.tagList.map(async (e: TagListType) => {

            const updateBookshelfTagInsertEntity = new UpdateBookshelfTagInsertEntity(
                userIdModel,
                bookIdModel,
                {
                    tagId: e.tagId,
                    tagName: e.tagName,
                },
            );

            const result = await this.updateBookshelfTagRepository.updateTag(updateBookshelfTagInsertEntity);

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
}
