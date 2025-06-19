import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { CookieModel } from 'src/cookie/model/CookieModel';
import { TestConnection } from 'src/entities/TestConnection';
import { GoogleBooksApiBookDetailModel } from 'src/external/googlebooksapi/bookdetail/model/GoogleBooksApiBookDetailModel';
import { GoogleBooksApiBooksDeitalEndPointModel } from 'src/external/googlebooksapi/bookdetail/model/GoogleBooksApiBooksDeitalEndPointModel';
import { GoogleBooksApiBooksDeitalBookIdModel } from 'src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel';
import { GoogleBooksApiBookListModel } from 'src/external/googlebooksapi/booklist/model/GoogleBooksApiBookListModel';
import { GoogleBooksApiBooksListEndPointModel } from 'src/external/googlebooksapi/booklist/model/GoogleBooksApiBooksListEndPointModel';
import { GoogleBooksApiBookListKeyword } from 'src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword';
import { JsonWebTokenModel } from 'src/jsonwebtoken/model/JsonWebTokenModel';
import { EntityManager, Repository } from 'typeorm';
import { Router, Request, Response, NextFunction } from 'express';
import { GoogleBooksDetailResponseType } from 'src/external/googlebooksapi/bookdetail/type/GoogleBooksDetailResponseType';
import { FLG } from 'src/common/const/CommonConst';
import { GetBookDetailResponseType } from '../type/get-book-detail-response.type';
import { JsonWebTokenUserModel } from 'src/jsonwebtoken/model/JsonWebTokenUserModel';
import { BookIdModel } from 'src/internal/bookshelftransaction/BookIdModel';
import { GetBookDetailSelectBookshelfEntity } from '../entity/get-book-detail-select-bookshelf.entity';
import { GetBookDetailRepository } from '../repository/get-book-detail.repository';


@Injectable()
export class GetBookDetailService {

    constructor(private readonly getBookDetailRepository: GetBookDetailRepository) { }

    /**
     * Google Books APIから書籍詳細を取得
     * @returns 
     */
    async getBookDetail(googleBooksApiBooksDeitalBookIdModel: GoogleBooksApiBooksDeitalBookIdModel): Promise<GoogleBooksApiBookDetailModel> {

        const googleBooksApiBooksDeitalEndPointModel = new GoogleBooksApiBooksDeitalEndPointModel(googleBooksApiBooksDeitalBookIdModel);

        const result = await GoogleBooksApiBookDetailModel.call(googleBooksApiBooksDeitalEndPointModel);

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
     * @returns 
     */
    public convertToResponse(apiResponse: GoogleBooksDetailResponseType): GetBookDetailResponseType {

        return {
            ...apiResponse,
            bookshelfFlg: FLG.OFF,
        }
    }

    /**
     * 本棚登録チェック
     * @param bookDetailResponse 
     * @param jsonWebTokenUserModel 
     * @returns 
     */
    public async checkBookshelf(bookDetailResponse: GetBookDetailResponseType,
        jsonWebTokenUserModel: JsonWebTokenUserModel,
        bookIdModel: BookIdModel,
    ) {

        // ユーザーID
        const frontUserIdModel = jsonWebTokenUserModel.frontUserIdModel;

        // 本棚情報取得用Entity
        const getBookDetailSelectBookshelfEntity = new GetBookDetailSelectBookshelfEntity(frontUserIdModel, bookIdModel);

        // 本棚情報を取得
        const bookshelf = await this.getBookDetailRepository.getBookshelfList(getBookDetailSelectBookshelfEntity);

        return {
            ...bookDetailResponse,
            bookshelfFlg: !!bookshelf ? FLG.ON : FLG.OFF
        };
    }
}
