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
import { UpdateBookshelfSummaryRepository } from '../repository/update-bookshelf-summary.repository';
import { FrontUserIdModel } from 'src/internal/common/FrontUserIdModel';
import { UpdateBookshelfSummaryEntity } from '../entity/update-bookshelf-summary.entity';
import { SummaryModel } from '../model/summary.model';
import { BookIdModel } from 'src/internal/bookshelftransaction/BookIdModel';

@Injectable()
export class UpdateBookshelfSummaryService {

    constructor(private readonly updateBookshelfSummaryRepository: UpdateBookshelfSummaryRepository) { }

    /**
     * Google Books APIから書籍詳細を取得
     * @returns 
     */
    async getApiBookInfo(googleBooksApiBooksDeitalBookIdModel: GoogleBooksApiBooksDeitalBookIdModel): Promise<GoogleBooksApiBookDetailModel> {

        const googleBooksApiBooksDeitalEndPointModel = new GoogleBooksApiBooksDeitalEndPointModel(googleBooksApiBooksDeitalBookIdModel);

        const result = await GoogleBooksApiBookDetailModel.call(googleBooksApiBooksDeitalEndPointModel);

        return result;
    }

    /**
     * 要約を更新
     * @param bookIdModel 
     * @param summaryModel 
     */
    async updateSummary(userIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel,
        summaryModel: SummaryModel) {

        const updateBookshelfSummaryEntity = new UpdateBookshelfSummaryEntity(
            userIdModel,
            bookIdModel,
            summaryModel,
        );

        const result = await this.updateBookshelfSummaryRepository.updateSummary(updateBookshelfSummaryEntity);

        return result;
    }
}
