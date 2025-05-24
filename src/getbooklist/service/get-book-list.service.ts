import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { TestConnection } from 'src/entities/TestConnection';
import { GoogleBooksApiBookListModel } from 'src/external/googlebooksapi/booklist/model/GoogleBooksApiBookListModel';
import { GoogleBooksApiBooksListEndPointModel } from 'src/external/googlebooksapi/booklist/model/GoogleBooksApiBooksListEndPointModel';
import { GoogleBooksApiBookListKeyword } from 'src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword';
import { EntityManager, Repository } from 'typeorm';
import { GetBookListRequestModel } from '../model/get-book-list-request.model';
import { GetBookListRequestDto } from '../dto/get-book-list-reques.dto';

@Injectable()
export class GetBookListService {

    constructor() { }

    /**
     * Google Books APIから書籍一覧を取得
     * @returns 
     */
    async getBookList(getBookListRequestModel: GetBookListRequestModel): Promise<GoogleBooksApiBookListModel> {

        const googleBooksApiBooksListEndPointModel = new GoogleBooksApiBooksListEndPointModel(
            getBookListRequestModel.keywordModel,
            getBookListRequestModel.startIndexModel,
            getBookListRequestModel.maxResultModel
        );

        const result = await GoogleBooksApiBookListModel.call(googleBooksApiBooksListEndPointModel);

        return result;
    }
}
