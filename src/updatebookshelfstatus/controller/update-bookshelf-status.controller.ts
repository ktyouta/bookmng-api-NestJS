import { Body, Controller, Get, Param, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from "src/common/api/ApiEndpoint";
import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { HttpStatus } from "src/common/const/HttpStatusConst";
import { ApiResponse } from "src/common/api/ApiResponse";
import { GoogleBooksApiBooksDeitalBookIdModel } from "src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel";
import { CookieCheckGuard } from "src/guard/cookie-check.guard";
import { JsonWebTokenUserModel } from "src/jsonwebtoken/model/JsonWebTokenUserModel";
import { Request } from 'express';
import { UpdateBookshelfStatusRequestDto } from "../dto/update-bookshelf-status-request.dto";
import { ReadStatusModel } from "../model/read-status.model";
import { TypeOrmTransaction } from "src/common/db/TypeOrmTransaction";
import { UpdateBookshelfStatusService } from "../service/update-bookshelf-status.service";
import { UpdateBookshelfStatusRequestModel } from "../model/update-bookshelf-status.request.model";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class UpdateBookshelfStatusController {

    constructor(private readonly updateBookshelfStatusService: UpdateBookshelfStatusService,) { }

    @UseGuards(CookieCheckGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true, }))
    @Put(ApiEndopoint.BOOKSHELF_STATUS)
    async execute(@Param('bookId') bookId: string,
        @Body() requestDto: UpdateBookshelfStatusRequestDto,
        @Req() req: Request,) {

        // jwt認証
        const jsonWebTokenUserModel = await JsonWebTokenUserModel.get(req);
        const userIdModel = jsonWebTokenUserModel.frontUserIdModel;
        const bookIdModel = new BookIdModel(bookId);
        const updateBookshelfStatusRequestModel = new UpdateBookshelfStatusRequestModel(requestDto);

        const tx = new TypeOrmTransaction();

        try {

            // トランザクション開始
            await tx.start();

            // ステータスを更新
            const result = await this.updateBookshelfStatusService.updateStatus(
                userIdModel,
                bookIdModel,
                updateBookshelfStatusRequestModel,
            );

            if (!result) {
                throw Error(`書籍ステータスの更新に失敗しました。`);
            }

            // コミット
            await tx.commit();

            return ApiResponse.create(
                HttpStatus.HTTP_STATUS_OK,
                `ステータスの更新に成功しました`,
                result,
            );

        } catch (e) {
            if (tx.isActive()) {
                tx.rollback();
            }
            throw Error(`書籍ステータス更新中にエラーが発生しました。ENDPOINT:${ApiEndopoint.BOOKSHELF_STATUS} MTTHOD:PUT ERROR:${e}`);
        } finally {
            tx.release();
        }
    }
}