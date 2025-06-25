import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { TestConnection } from 'src/entities/TestConnection';
import { GoogleBooksApiBookListModel } from 'src/external/googlebooksapi/booklist/model/GoogleBooksApiBookListModel';
import { GoogleBooksApiBooksListEndPointModel } from 'src/external/googlebooksapi/booklist/model/GoogleBooksApiBooksListEndPointModel';
import { GoogleBooksApiBookListKeyword } from 'src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword';
import { FrontUserIdModel } from 'src/internal/common/FrontUserIdModel';
import { EntityManager, Repository } from 'typeorm';
import { BookshelfTransaction } from 'src/entities/BookshelfTransaction';
import { GoogleBooksApiBooksDeitalBookIdModel } from 'src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel';
import { GoogleBooksApiBooksDeitalEndPointModel } from 'src/external/googlebooksapi/bookdetail/model/GoogleBooksApiBooksDeitalEndPointModel';
import { GoogleBooksApiBookDetailModel } from 'src/external/googlebooksapi/bookdetail/model/GoogleBooksApiBookDetailModel';
import { GetBookshelfResponseType } from '../type/get-bookshelf-response.type';
import { GetBookshelfListRepository } from '../repository/get-bookshelf-list.repository';
import { GetBookshelfListSelectBookshelfEntity } from '../entity/get-bookshelf-list-select-bookshelf.entity';
import { GetBookshelfListRequestModel } from '../model/get-bookshelf-list-request.model';
import { BookshelfType } from '../type/bookshelf.type';

@Injectable()
export class GetBookshelfListService {

    constructor(private readonly getBookshelfRepository: GetBookshelfListRepository) { }

    /**
     * 本棚情報一覧を取得
     * @param userIdModel 
     */
    async getBookshelfList(userIdModel: FrontUserIdModel,
        getBookshelfListRequestModel: GetBookshelfListRequestModel,
    ) {

        const getBookshelfSelectBookshelfEntity = new GetBookshelfListSelectBookshelfEntity(
            userIdModel,
            getBookshelfListRequestModel
        );

        const bookshelfList = await this.getBookshelfRepository.getBookshelfList(getBookshelfSelectBookshelfEntity);

        return bookshelfList;
    }


    /**
     * 本棚情報をもとにGoogle Books APIから書籍情報を取得
     * @param bookshelfList 
     */
    async mergeGoogleBooksInfo(bookshelfList: BookshelfType[]) {

        const mergedBookshelfList: GetBookshelfResponseType[] = await Promise.all(bookshelfList.map(async (e: BookshelfType) => {

            const googleBooksApiBooksDeitalBookIdModel = new GoogleBooksApiBooksDeitalBookIdModel(e.bookId);
            const googleBooksApiBooksDeitalEndPointModel = new GoogleBooksApiBooksDeitalEndPointModel(googleBooksApiBooksDeitalBookIdModel);

            // Google Books APIから書籍詳細を取得
            const googleBooksDetailModel = await GoogleBooksApiBookDetailModel.call(googleBooksApiBooksDeitalEndPointModel);

            return {
                ...googleBooksDetailModel.response,
                ...e,
            }
        }));

        return mergedBookshelfList;
    }
}
