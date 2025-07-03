import { Controller, Get, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from "src/common/api/ApiEndpoint";
import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { HttpStatus } from "src/common/const/HttpStatusConst";
import { ApiResponse } from "src/common/api/ApiResponse";
import { JsonWebTokenUserModel } from "src/jsonwebtoken/model/JsonWebTokenUserModel";
import { Request } from 'express';
import { GetBookshelfSortListService } from "../service/get-bookshelf-sort-list.service";
import { GetBookshelfSortListRequestDto } from "../dto/get-bookshelf-sort-list-request.dto";
import { CookieCheckGuard } from "src/guard/cookie-check.guard";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class GetBookshelfSortListController {

    constructor(private readonly getBookshelfSortListService: GetBookshelfSortListService,) { }

    @UseGuards(CookieCheckGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Get(ApiEndopoint.BOOKSHELF_SORT_LIST)
    async execute(@Req() req: Request) {

        // jwt認証
        await JsonWebTokenUserModel.get(req);

        // 本棚ソートリストを取得する
        const bookshelfSortList = await this.getBookshelfSortListService.getBookshelfSortList();

        return ApiResponse.create(
            HttpStatus.HTTP_STATUS_OK,
            `本棚ソートリストの取得に成功しました`,
            bookshelfSortList,
        );
    }
}