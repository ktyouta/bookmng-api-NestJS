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
import { GetBookshelfTagRepository } from '../repository/get-bookshelf-tag.repository';
import { FrontUserIdModel } from 'src/internal/common/FrontUserIdModel';
import { GetBookshelfTagEntity } from '../entity/get-bookshelf-tag.entity';
import { GetBookshelfTagSelectBookshelfEntity } from '../entity/get-bookshelf-tag-select-bookshelf.entity';
import { BookIdModel } from 'src/internal/bookshelftransaction/BookIdModel';


@Injectable()
export class GetBookshelfTagService {

    constructor(private readonly getBookshelfTagRepository: GetBookshelfTagRepository) { }

    /**
     * 本棚情報を取得
     * @param userIdModel 
     * @param createBookshelfTagRequestModel 
     * @returns 
     */
    async getBookshelfList(userIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel,
    ) {

        const getBookshelfTagSelectBookshelfEntity = new GetBookshelfTagSelectBookshelfEntity(
            userIdModel,
            bookIdModel
        );

        const bookshelfList = await this.getBookshelfTagRepository.getBookshelfList(getBookshelfTagSelectBookshelfEntity);

        return bookshelfList;
    }

    /**
     * タグを取得
     * @param bookIdModel 
     * @param statusModel 
     */
    async getTag(userIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel,
    ) {

        const getBookshelfTagEntity = new GetBookshelfTagEntity(
            userIdModel,
            bookIdModel,
        );

        const result = await this.getBookshelfTagRepository.getTag(getBookshelfTagEntity);

        return result;
    }
}
