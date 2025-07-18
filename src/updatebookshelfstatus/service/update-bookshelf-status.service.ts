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
import { UpdateBookshelfStatusRepository } from '../repository/update-bookshelf-status.repository';
import { FrontUserIdModel } from 'src/internal/common/FrontUserIdModel';
import { UpdateBookshelfStatusEntity } from '../entity/update-bookshelf-status.entity';
import { UpdateBookshelfStatusRequestModel } from '../model/update-bookshelf-status.request.model';
import { BookIdModel } from 'src/internal/bookshelftransaction/BookIdModel';


@Injectable()
export class UpdateBookshelfStatusService {

    constructor(private readonly updateBookshelfStatusRepository: UpdateBookshelfStatusRepository) { }

    /**
     * ステータスを更新
     * @param bookIdModel 
     * @param statusModel 
     */
    async updateStatus(userIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel,
        updateBookshelfStatusRequestModel: UpdateBookshelfStatusRequestModel) {

        const updateBookshelfStatusEntity = new UpdateBookshelfStatusEntity(
            userIdModel,
            bookIdModel,
            updateBookshelfStatusRequestModel,
        );

        const result = await this.updateBookshelfStatusRepository.updateStatus(updateBookshelfStatusEntity);

        return result;
    }
}
