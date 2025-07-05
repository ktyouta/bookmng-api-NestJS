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
import { UpdateBookshelfReviewRepository } from '../repository/update-bookshelf-review.repository';
import { FrontUserIdModel } from 'src/internal/common/FrontUserIdModel';
import { UpdateBookshelfReviewEntity } from '../entity/update-bookshelf-review.entity';
import { ReviewModel } from '../model/review.model';
import { BookIdModel } from 'src/internal/bookshelftransaction/BookIdModel';

@Injectable()
export class UpdateBookshelfReviewService {

    constructor(private readonly updateBookshelfReviewRepository: UpdateBookshelfReviewRepository) { }

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
     * レビューを更新
     * @param bookIdModel 
     * @param reviewModel 
     */
    async updateReview(userIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel,
        reviewModel: ReviewModel) {

        const updateBookshelfReviewEntity = new UpdateBookshelfReviewEntity(
            userIdModel,
            bookIdModel,
            reviewModel,
        );

        const result = await this.updateBookshelfReviewRepository.updateReview(updateBookshelfReviewEntity);

        return result;
    }
}
