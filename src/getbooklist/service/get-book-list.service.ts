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
import { CookieModel } from 'src/cookie/model/CookieModel';
import { JsonWebTokenModel } from 'src/jsonwebtoken/model/JsonWebTokenModel';
import { Router, Request, Response, NextFunction } from 'express';
import { GoogleBooksAPIsModelType } from 'src/external/googlebooksapi/booklist/type/GoogleBooksAPIsModelType';
import { JsonWebTokenUserModel } from 'src/jsonwebtoken/model/JsonWebTokenUserModel';
import { GetBookListSelectBookshelfEntity } from '../entity/get-book-list-select-bookshelf.entity';
import { GetBookListRepository } from '../repository/get-book-list.repository';
import { BookshelfTransaction } from 'src/entities/BookshelfTransaction';
import { GoogleBooksAPIsModelItemsType } from 'src/external/googlebooksapi/booklist/type/GoogleBooksAPIsModelItemsType';
import { GetBooKListResponseType } from '../type/get-book-list-response.type';
import { FLG } from 'src/common/const/CommonConst';
import { GetBooKListItemType } from '../type/get-book-list-item.type';


@Injectable()
export class GetBookListService {

    constructor(private readonly getBookListRepository: GetBookListRepository) { }

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

    /**
     * jwtを取得
     * @param req 
     * @returns 
     */
    public getToken(req: Request) {

        const cookieModel = new CookieModel(req);
        const jsonWebTokenModel = new JsonWebTokenModel(cookieModel);

        return jsonWebTokenModel.token;
    }

    /**
     * レスポンス用の型に変換する
     * @param apiResponse 
     */
    public convertToResponse(apiResponse: GoogleBooksAPIsModelType) {

        // 本棚登録チェック
        const bookItems: GetBooKListItemType[] = apiResponse.items.map((e: GoogleBooksAPIsModelItemsType) => {

            return {
                ...e,
                bookshelfFlg: FLG.OFF
            }
        });

        const response: GetBooKListResponseType = {
            ...apiResponse,
            items: bookItems
        };

        return response;
    }

    /**
     * 本棚登録チェック
     * @param convertedVideoList 
     * @param jsonWebTokenUserModel 
     * @returns 
     */
    public async checkBookshelf(apiResponse: GoogleBooksAPIsModelType,
        jsonWebTokenUserModel: JsonWebTokenUserModel,
    ) {

        // ユーザーID
        const frontUserIdModel = jsonWebTokenUserModel.frontUserIdModel;

        // 本棚情報取得用Entity
        const getBookListSelectBookshelfEntity = new GetBookListSelectBookshelfEntity(frontUserIdModel);

        // 本棚情報を取得
        const bookshelfList = await this.getBookListRepository.getBookshelfList(getBookListSelectBookshelfEntity);

        // 本棚登録チェック
        const bookItems: GetBooKListItemType[] = apiResponse.items.map((e: GoogleBooksAPIsModelItemsType) => {

            // 本棚に登録済み
            const bookshelfInfo = bookshelfList.find((e1: BookshelfTransaction) => {
                return e1.bookId === e.id;
            });

            return {
                ...e,
                bookshelfFlg: !!bookshelfInfo ? FLG.ON : FLG.OFF
            }
        });

        const response: GetBooKListResponseType = {
            ...apiResponse,
            items: bookItems
        };

        return response;
    }
}
