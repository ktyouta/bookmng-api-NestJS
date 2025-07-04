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
import { GetTagListRepository } from '../repository/get-tag-list.repository';


@Injectable()
export class GetTagListService {

    constructor(private readonly getBookshelfRepository: GetTagListRepository) { }

    /**
     * タグリストを取得
     * @param userIdModel 
     */
    async getTagList(userIdModel: FrontUserIdModel) {

        const tagList = await this.getBookshelfRepository.getTagList(userIdModel);

        return tagList;
    }
}
