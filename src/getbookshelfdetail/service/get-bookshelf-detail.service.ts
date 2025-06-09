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
import { GetBookshelfDetailRepository } from '../repository/get-bookshelf-detail.repository';
import { FrontUserIdModel } from 'src/internal/common/FrontUserIdModel';
import { GetBookshelfDetailSelectBookshelfEntity } from '../entity/get-bookshelf-detail-select-bookshelf.entity';

@Injectable()
export class GetBookshelfDetailService {

    constructor(private readonly getBookshelfDetailRepository: GetBookshelfDetailRepository) { }

    /**
     * 本棚情報を取得
     * @param userIdModel 
     * @returns 
     */
    async getBookshelf(userIdModel: FrontUserIdModel,
        bookIdModel: GoogleBooksApiBooksDeitalBookIdModel) {

        const getBookshelfDetailSelectBookshelfEntity = new GetBookshelfDetailSelectBookshelfEntity(
            userIdModel,
            bookIdModel
        );

        const bookshelfList = await this.getBookshelfDetailRepository.getBookshelf(getBookshelfDetailSelectBookshelfEntity);

        return bookshelfList;
    }

    /**
     * Google Books APIから書籍詳細を取得
     * @returns 
     */
    async getApiBookInfo(googleBooksApiBooksDeitalBookIdModel: GoogleBooksApiBooksDeitalBookIdModel): Promise<GoogleBooksApiBookDetailModel> {

        const googleBooksApiBooksDeitalEndPointModel = new GoogleBooksApiBooksDeitalEndPointModel(googleBooksApiBooksDeitalBookIdModel);

        const result = await GoogleBooksApiBookDetailModel.call(googleBooksApiBooksDeitalEndPointModel);

        return result;
    }
}
