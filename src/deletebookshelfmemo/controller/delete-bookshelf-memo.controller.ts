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
import { MemoIdModel } from "../model/memo-id.model";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";
import { DeleteBookshelfMemoService } from "src/deletebookshelfmemo/service/delete-bookshelf-memo.service";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class DeleteBookshelfMemoController {

    constructor(private readonly deleteBookshelfMemoService: DeleteBookshelfMemoService,) { }

    @UseGuards(CookieCheckGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true, }))
    @Delete(ApiEndopoint.BOOKSHELF_MEMO_ID)
    async execute(@Param('bookId') bookId: string,
        @Param('memoId') memoId: string,
        @Req() req: Request,) {

        // jwt認証
        const jsonWebTokenUserModel = await JsonWebTokenUserModel.get(req);
        const userIdModel = jsonWebTokenUserModel.frontUserIdModel;
        const bookIdModel = new BookIdModel(bookId);
        const memoIdModel = new MemoIdModel(memoId);

        const tx = new TypeOrmTransaction();

        try {

            // トランザクション開始
            await tx.start();

            // 書籍存在チェック
            const bookshelfList = await this.deleteBookshelfMemoService.getBookshelfList(
                userIdModel,
                bookIdModel
            );

            if (!bookshelfList || bookshelfList.length === 0) {
                throw Error(`書籍情報が存在しません。`);
            }

            // メモを削除
            const result = await this.deleteBookshelfMemoService.deleteMemo(
                userIdModel,
                bookIdModel,
                memoIdModel,
            );

            if (!result) {
                throw Error(`メモの削除に失敗しました。`);
            }

            // コミット
            await tx.commit();

            return ApiResponse.create(
                HttpStatus.HTTP_STATUS_OK,
                `メモの削除に成功しました`,
                result,
            );

        } catch (e) {
            if (tx.isActive()) {
                tx.rollback();
            }
            throw Error(`メモ削除中にエラーが発生しました。ENDPOINT:${ApiEndopoint.BOOKSHELF_MEMO_ID} MTTHOD:PUT ERROR:${e}`);
        } finally {
            tx.release();
        }
    }
}