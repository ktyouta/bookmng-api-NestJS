import { Controller, Get, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from "src/common/api/ApiEndpoint";
import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { HttpStatus } from "src/common/const/HttpStatusConst";
import { ApiResponse } from "src/common/api/ApiResponse";
import { JsonWebTokenUserModel } from "src/jsonwebtoken/model/JsonWebTokenUserModel";
import { Request } from 'express';
import { GetBookshelfListService } from "../service/get-bookshelf-list.service";
import { GetBookshelfListRequestDto } from "../dto/get-bookshelf-list-request.dto";
import { CookieCheckGuard } from "src/guard/cookie-check.guard";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class GetBookshelfListController {

    constructor(private readonly getBookshelfListService: GetBookshelfListService,) { }

    @UseGuards(CookieCheckGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Get(ApiEndopoint.BOOKSHELF)
    async execute(@Query() requestDto: GetBookshelfListRequestDto,
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response) {

        // jwt認証
        const jsonWebTokenUserModel = await JsonWebTokenUserModel.get(req);
        const userIdModel = jsonWebTokenUserModel.frontUserIdModel;

        // 本棚情報一覧を取得する
        const bookshelfList = await this.getBookshelfListService.getBookshelfList(userIdModel);

        // 本棚情報をもとにGoogle Books APIから書籍情報を取得
        const bookshelfListMergedList = await this.getBookshelfListService.mergeGoogleBooksInfo(bookshelfList);

        return ApiResponse.create(
            HttpStatus.HTTP_STATUS_OK,
            `本棚情報(一覧)の取得に成功しました`,
            bookshelfListMergedList,
        );
    }
}