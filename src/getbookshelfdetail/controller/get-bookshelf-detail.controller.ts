import { Controller, Get, Param, Query, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from "src/common/api/ApiEndpoint";
import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { HttpStatus } from "src/common/const/HttpStatusConst";
import { ApiResponse } from "src/common/api/ApiResponse";
import { GoogleBooksApiBooksDeitalBookIdModel } from "src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel";
import { GetBookshelfDetailService } from "../service/get-bookshelf-detail.service";
import { GetBookshelfDetailResponse } from "../dto/get-bookshelf-detail-response.dto";
import { CookieCheckGuard } from "src/guard/cookie-check.guard";
import { JsonWebTokenUserModel } from "src/jsonwebtoken/model/JsonWebTokenUserModel";
import { Request } from 'express';


@Controller(BOOKMNG_ENDPOINT_PATH)
export class GetBookshelfDetailController {

    constructor(private readonly getBookshelfDetailService: GetBookshelfDetailService,) { }

    @UseGuards(CookieCheckGuard)
    @Get(ApiEndopoint.BOOKSHELF_ID)
    async execute(@Param('id') id: string,
        @Req() req: Request,) {

        // jwt認証
        const jsonWebTokenUserModel = await JsonWebTokenUserModel.get(req);
        const userIdModel = jsonWebTokenUserModel.frontUserIdModel;

        const bookIdModel = new GoogleBooksApiBooksDeitalBookIdModel(id);

        // 本棚情報を取得
        const bookshelf = await this.getBookshelfDetailService.getBookshelf(
            userIdModel,
            bookIdModel
        );

        if (!bookshelf) {
            throw Error(`書籍情報の取得に失敗しました。`);
        }

        // Google Books APIから書籍詳細を取得する
        const bookshelfDetailModel = await this.getBookshelfDetailService.getApiBookInfo(bookIdModel);

        // レスポンスの書籍詳細
        const getBookshelfDetailResponse = new GetBookshelfDetailResponse(
            bookshelf,
            bookshelfDetailModel
        );

        return ApiResponse.create(
            HttpStatus.HTTP_STATUS_OK,
            `書籍情報(詳細)の取得に成功しました`,
            getBookshelfDetailResponse.data
        );
    }
}