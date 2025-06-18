import { Controller, Get, Query, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from "src/common/api/ApiEndpoint";
import { GetBookListService } from "../service/get-book-list.service";
import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { HttpStatus } from "src/common/const/HttpStatusConst";
import { GetBookListRequestDto } from "../dto/get-book-list-reques.dto";
import { ApiResponse } from "src/common/api/ApiResponse";
import { GetBookListRequestModel } from "../model/get-book-list-request.model";
import { Router, Request, Response, NextFunction } from 'express';
import { JsonWebTokenUserModel } from "src/jsonwebtoken/model/JsonWebTokenUserModel";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class GetBookListController {

    constructor(private readonly getBookListService: GetBookListService,) { }

    @Get(ApiEndopoint.BOOK)
    @UsePipes(new ValidationPipe({
        whitelist: true,
        transform: true,
    }))
    async execute(@Query() requestDto: GetBookListRequestDto,
        @Req() req: Request,) {

        const getBookListRequestModel = new GetBookListRequestModel(requestDto);

        // Google Books APIから書籍一覧を取得する
        const bookListModel = await this.getBookListService.getBookList(getBookListRequestModel);

        let apiResponse = this.getBookListService.convertToResponse(bookListModel.response);

        // jwt取得
        const token = this.getBookListService.getToken(req);

        // ログインしている場合は本棚登録チェックを実施
        if (token) {
            // jwt認証
            const jsonWebTokenUserModel = await JsonWebTokenUserModel.get(req);

            // 本棚登録チェック
            apiResponse = await this.getBookListService.checkBookshelf(apiResponse, jsonWebTokenUserModel);
        }

        return ApiResponse.create(
            HttpStatus.HTTP_STATUS_OK,
            `書籍情報(一覧)の取得に成功しました`,
            apiResponse
        );
    }
}