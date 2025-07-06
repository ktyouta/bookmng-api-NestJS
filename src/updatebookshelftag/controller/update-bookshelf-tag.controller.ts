import { Body, Controller, Get, Param, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
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
import { UpdateBookshelfTagService } from "../service/update-bookshelf-tag.service";
import { UpdateBookshelfTagRequestDto } from "../dto/update-bookshelf-tag-request.dto";
import { TagIdModel } from "../model/tag-id.model";
import { UpdateBookshelfTagRequestModel } from "../model/update-bookshelf-tag.request.model";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class UpdateBookshelfTagController {

    private static readonly ENDPOINT = ApiEndopoint.BOOKSHELF_TAG;

    constructor(private readonly updateBookshelfTagService: UpdateBookshelfTagService,) { }

    @UseGuards(CookieCheckGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true, }))
    @Put(UpdateBookshelfTagController.ENDPOINT)
    async execute(@Param('bookId') bookId: string,
        @Body() requestDto: UpdateBookshelfTagRequestDto,
        @Req() req: Request,) {

        // jwt認証
        const jsonWebTokenUserModel = await JsonWebTokenUserModel.get(req);
        const userIdModel = jsonWebTokenUserModel.frontUserIdModel;
        const bookIdModel = new BookIdModel(bookId);
        const updateBookshelfTagRequestModel = new UpdateBookshelfTagRequestModel(requestDto);

        const tx = new TypeOrmTransaction();

        try {

            // トランザクション開始
            await tx.start();

            // 書籍存在チェック
            const bookshelfList = await this.updateBookshelfTagService.getBookshelfList(
                userIdModel,
                bookIdModel
            );

            if (!bookshelfList || bookshelfList.length === 0) {
                throw Error(`書籍情報が存在しません。`);
            }

            // タグマスタに登録

            // タグを削除
            const delResult = await this.updateBookshelfTagService.deleteTag(
                userIdModel,
                bookIdModel,
            );

            if (!delResult) {
                throw Error(`タグの削除に失敗しました。`);
            }

            // タグを登録
            const updResult = await this.updateBookshelfTagService.insertTag(
                userIdModel,
                bookIdModel,
                updateBookshelfTagRequestModel,
            );

            if (!updResult) {
                throw Error(`タグの更新に失敗しました。`);
            }

            // タグ情報を取得

            // コミット
            await tx.commit();

            return ApiResponse.create(
                HttpStatus.HTTP_STATUS_OK,
                `タグの更新に成功しました`,
                updResult,
            );

        } catch (e) {
            if (tx.isActive()) {
                tx.rollback();
            }
            throw Error(`タグ更新中にエラーが発生しました。ENDPOINT:${UpdateBookshelfTagController.ENDPOINT} MTTHOD:PUT ERROR:${e}`);
        } finally {
            tx.release();
        }
    }
}