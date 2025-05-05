import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { TestConnection } from 'src/entities/TestConnection';
import { GoogleBooksApiBookListModel } from 'src/external/googlebooksapi/booklist/model/GoogleBooksApiBookListModel';
import { GoogleBooksApiBooksListEndPointModel } from 'src/external/googlebooksapi/booklist/model/GoogleBooksApiBooksListEndPointModel';
import { GoogleBooksApiBookListKeyword } from 'src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CreateFrontUserService {

    constructor() { }

    /**
     * Google Books APIから書籍一覧を取得
     * @returns 
     */
    async getBookList(googleBooksApiBookListKeyword: GoogleBooksApiBookListKeyword): Promise<GoogleBooksApiBookListModel> {

        const googleBooksApiBooksListEndPointModel = new GoogleBooksApiBooksListEndPointModel(googleBooksApiBookListKeyword);

        const result = await GoogleBooksApiBookListModel.call(googleBooksApiBooksListEndPointModel);

        return result;
    }
}
