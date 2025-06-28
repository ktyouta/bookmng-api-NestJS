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
import { GetBookshelfMemoRepository } from '../repository/get-bookshelf-memo.repository';
import { FrontUserIdModel } from 'src/internal/common/FrontUserIdModel';
import { GetBookshelfMemoEntity } from '../entity/get-bookshelf-memo.entity';
import { GetBookshelfMemoSelectBookshelfEntity } from '../entity/get-bookshelf-memo-select-bookshelf.entity';
import { BookIdModel } from 'src/internal/bookshelftransaction/BookIdModel';


@Injectable()
export class GetBookshelfMemoService {

    constructor(private readonly getBookshelfMemoRepository: GetBookshelfMemoRepository) { }

    /**
     * 本棚情報を取得
     * @param userIdModel 
     * @param createBookshelfMemoRequestModel 
     * @returns 
     */
    async getBookshelfList(userIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel,
    ) {

        const getBookshelfMemoSelectBookshelfEntity = new GetBookshelfMemoSelectBookshelfEntity(
            userIdModel,
            bookIdModel
        );

        const bookshelfList = await this.getBookshelfMemoRepository.getBookshelfList(getBookshelfMemoSelectBookshelfEntity);

        return bookshelfList;
    }

    /**
     * メモを取得
     * @param bookIdModel 
     * @param statusModel 
     */
    async getMemo(userIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel,
    ) {

        const getBookshelfMemoEntity = new GetBookshelfMemoEntity(
            userIdModel,
            bookIdModel,
        );

        const result = await this.getBookshelfMemoRepository.getMemo(getBookshelfMemoEntity);

        return result;
    }
}
