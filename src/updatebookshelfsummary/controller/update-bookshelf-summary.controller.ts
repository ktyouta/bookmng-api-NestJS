import { Body, Controller, Get, Param, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from "src/common/api/ApiEndpoint";
import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { HttpStatus } from "src/common/const/HttpStatusConst";
import { ApiResponse } from "src/common/api/ApiResponse";
import { GoogleBooksApiBooksDeitalBookIdModel } from "src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel";
import { UpdateBookshelfSummaryService } from "../service/update-bookshelf-summary.service";
import { CookieCheckGuard } from "src/guard/cookie-check.guard";
import { JsonWebTokenUserModel } from "src/jsonwebtoken/model/JsonWebTokenUserModel";
import { Request } from 'express';
import { UpdateBookshelfSummaryRequestDto } from "../dto/update-bookshelf-summary-request.dto";
import { SummaryModel } from "../model/summary.model";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class UpdateBookshelfSummaryController {

    constructor(private readonly pdateBookshelfSummaryService: UpdateBookshelfSummaryService,) { }

    @UseGuards(CookieCheckGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Put(ApiEndopoint.BOOKSHELF_SUMMARY)
    async execute(@Param('bookId') bookId: string,
        @Body() requestDto: UpdateBookshelfSummaryRequestDto,
        @Req() req: Request,) {

        // jwt認証
        const jsonWebTokenUserModel = await JsonWebTokenUserModel.get(req);
        const userIdModel = jsonWebTokenUserModel.frontUserIdModel;

        const bookIdModel = new BookIdModel(bookId);
        const summaryModel = new SummaryModel(requestDto);

        // 要約を更新
        const result = await this.pdateBookshelfSummaryService.updateSummary(
            userIdModel,
            bookIdModel,
            summaryModel,
        );

        const updateCount = result.affected;

        if (!updateCount || updateCount === 0) {
            throw Error(`要約の更新に失敗しました。`);
        }

        return ApiResponse.create(
            HttpStatus.HTTP_STATUS_OK,
            `要約の更新に成功しました`,
            summaryModel.summary
        );
    }
}