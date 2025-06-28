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
import { DeleteBookshelfMemoRepository } from '../repository/delete-bookshelf-memo.repository';
import { FrontUserIdModel } from 'src/internal/common/FrontUserIdModel';
import { DeleteBookshelfMemoEntity } from '../entity/delete-bookshelf-memo.entity';
import { MemoIdModel } from '../model/memo-id.model';
import { DeleteBookshelfMemoSelectBookshelfEntity } from '../entity/delete-bookshelf-memo-select-bookshelf.entity';
import { BookIdModel } from 'src/internal/bookshelftransaction/BookIdModel';


@Injectable()
export class DeleteBookshelfMemoService {

    constructor(private readonly deleteBookshelfMemoRepository: DeleteBookshelfMemoRepository) { }

    /**
     * 本棚情報を取得
     * @param userIdModel 
     * @param createBookshelfMemoRequestModel 
     * @returns 
     */
    async getBookshelfList(userIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel,
    ) {

        const deleteBookshelfMemoSelectBookshelfEntity = new DeleteBookshelfMemoSelectBookshelfEntity(
            userIdModel,
            bookIdModel
        );

        const bookshelfList = await this.deleteBookshelfMemoRepository.getBookshelfList(deleteBookshelfMemoSelectBookshelfEntity);

        return bookshelfList;
    }

    /**
     * ステータスを削除
     * @param bookIdModel 
     * @param statusModel 
     */
    async deleteMemo(userIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel,
        memoIdModel: MemoIdModel,
    ) {

        const deleteBookshelfMemoEntity = new DeleteBookshelfMemoEntity(
            userIdModel,
            bookIdModel,
            memoIdModel,
        );

        const result = await this.deleteBookshelfMemoRepository.deleteMemo(deleteBookshelfMemoEntity);

        return result;
    }
}
