import { Body, Controller, Delete, Get, Param, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from "src/common/api/ApiEndpoint";
import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { HttpStatus } from "src/common/const/HttpStatusConst";
import { ApiResponse } from "src/common/api/ApiResponse";
import { GoogleBooksApiBooksDeitalBookIdModel } from "src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel";
import { CookieCheckGuard } from "src/guard/cookie-check.guard";
import { JsonWebTokenUserModel } from "src/jsonwebtoken/model/JsonWebTokenUserModel";
import { Request } from 'express';
import { TypeOrmTransaction } from "src/common/db/TypeOrmTransaction";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";
import { GetBookshelfMemoService } from "../service/get-bookshelf-memo.service";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class GetBookshelfMemoController {

    constructor(private readonly getBookshelfMemoService: GetBookshelfMemoService,) { }

    @UseGuards(CookieCheckGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true, }))
    @Delete(ApiEndopoint.BOOKSHELF_MEMO)
    async execute(@Param('bookId') bookId: string,
        @Req() req: Request,) {

        // jwt認証
        const jsonWebTokenUserModel = await JsonWebTokenUserModel.get(req);
        const userIdModel = jsonWebTokenUserModel.frontUserIdModel;
        const bookIdModel = new BookIdModel(bookId);

        // 書籍存在チェック
        const bookshelfList = await this.getBookshelfMemoService.getBookshelfList(
            userIdModel,
            bookIdModel
        );

        if (!bookshelfList || bookshelfList.length === 0) {
            throw Error(`書籍情報が存在しません。`);
        }

        // メモを取得
        const result = await this.getBookshelfMemoService.getMemo(
            userIdModel,
            bookIdModel,
        );

        return ApiResponse.create(
            HttpStatus.HTTP_STATUS_OK,
            `メモの取得に成功しました`,
            result,
        );
    }
}