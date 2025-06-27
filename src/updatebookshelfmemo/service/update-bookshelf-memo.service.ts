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
import { UpdateBookshelfMemoRepository } from '../repository/update-bookshelf-memo.repository';
import { FrontUserIdModel } from 'src/internal/common/FrontUserIdModel';
import { UpdateBookshelfMemoEntity } from '../entity/update-bookshelf-memo.entity';
import { UpdateBookshelfMemoRequestModel } from '../model/update-bookshelf-memo.request.model';
import { MemoIdModel } from '../model/memo-id.model';
import { UpdateBookshelfMemoSelectBookshelfEntity } from '../entity/update-bookshelf-memo-select-bookshelf.entity';
import { BookIdModel } from 'src/internal/bookshelftransaction/BookIdModel';


@Injectable()
export class UpdateBookshelfMemoService {

    constructor(private readonly updateBookshelfMemoRepository: UpdateBookshelfMemoRepository) { }

    /**
     * 本棚情報を取得
     * @param userIdModel 
     * @param createBookshelfMemoRequestModel 
     * @returns 
     */
    async getBookshelfList(userIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel,
    ) {

        const updateBookshelfMemoSelectBookshelfEntity = new UpdateBookshelfMemoSelectBookshelfEntity(
            userIdModel,
            bookIdModel
        );

        const bookshelfList = await this.updateBookshelfMemoRepository.getBookshelfList(updateBookshelfMemoSelectBookshelfEntity);

        return bookshelfList;
    }

    /**
     * ステータスを更新
     * @param bookIdModel 
     * @param statusModel 
     */
    async updateMemo(userIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel,
        memoIdModel: MemoIdModel,
        updateBookshelfMemoRequestModel: UpdateBookshelfMemoRequestModel) {

        const updateBookshelfMemoEntity = new UpdateBookshelfMemoEntity(
            userIdModel,
            bookIdModel,
            memoIdModel,
            updateBookshelfMemoRequestModel.memoModel,
        );

        const result = await this.updateBookshelfMemoRepository.updateStatus(updateBookshelfMemoEntity);

        return result;
    }
}
