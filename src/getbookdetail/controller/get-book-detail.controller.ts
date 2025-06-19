import { Controller, Get, Param, Query, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from "src/common/api/ApiEndpoint";
import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { HttpStatus } from "src/common/const/HttpStatusConst";
import { ApiResponse } from "src/common/api/ApiResponse";
import { GoogleBooksApiBooksDeitalBookIdModel } from "src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel";
import { GetBookDetailService } from "../service/get-book-detail.service";
import { Router, Request, Response, NextFunction } from 'express';
import { JsonWebTokenUserModel } from "src/jsonwebtoken/model/JsonWebTokenUserModel";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class GetBookDetailController {

    constructor(private readonly getBookDetailService: GetBookDetailService,) { }

    @Get(ApiEndopoint.BOOK_ID)
    async execute(@Param('id') id: string,
        @Req() req: Request,
    ) {

        const googleBooksApiBooksDeitalBookIdModel = new GoogleBooksApiBooksDeitalBookIdModel(id);

        // Google Books APIから書籍詳細を取得する
        const bookDetailModel = await this.getBookDetailService.getBookDetail(googleBooksApiBooksDeitalBookIdModel);

        let response = this.getBookDetailService.convertToResponse(bookDetailModel.response);

        // jwt取得
        const token = this.getBookDetailService.getToken(req);

        // ログインしている場合は本棚登録チェックを実施
        if (token) {
            // jwt認証
            const jsonWebTokenUserModel = await JsonWebTokenUserModel.get(req);
            const bookIdModel = new BookIdModel(id);

            // 本棚登録チェック
            response = await this.getBookDetailService.checkBookshelf(response, jsonWebTokenUserModel, bookIdModel);
        }

        return ApiResponse.create(
            HttpStatus.HTTP_STATUS_OK,
            `書籍情報(詳細)の取得に成功しました`,
            response
        );
    }
}