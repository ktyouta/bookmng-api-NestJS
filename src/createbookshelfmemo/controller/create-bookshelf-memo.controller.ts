import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from "src/common/api/ApiEndpoint";
import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { HttpStatus } from "src/common/const/HttpStatusConst";
import { ApiResponse } from "src/common/api/ApiResponse";
import { TypeOrmTransaction } from "src/common/db/TypeOrmTransaction";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { JsonWebTokenModel } from "src/jsonwebtoken/model/JsonWebTokenModel";
import { Response } from 'express';
import { NewJsonWebTokenModel } from "src/jsonwebtoken/model/NewJsonWebTokenModel";
import { CreateBookshelfMemoService } from "../service/create-bookshelf-memo.service";
import { CreateBookshelfMemoRequestDto } from "../dto/create-bookshelf-memo-request.dto";
import { CookieCheckGuard } from "src/guard/cookie-check.guard";
import { JsonWebTokenUserModel } from "src/jsonwebtoken/model/JsonWebTokenUserModel";
import { Request } from 'express';
import { CreateBookshelfMemoRequestModel } from "../model/create-bookshelf-memo-request.model";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class CreateBookshelfMemoController {

    // ENDPOINT
    private static readonly ENDPOINT = ApiEndopoint.BOOKSHELF_MEMO;

    constructor(private readonly createBookshelfMemoService: CreateBookshelfMemoService,) { }

    @UseGuards(CookieCheckGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post(CreateBookshelfMemoController.ENDPOINT)
    async execute(@Body() requestDto: CreateBookshelfMemoRequestDto,
        @Param(`bookId`) bookId: string,
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response) {

        // jwt認証
        const jsonWebTokenUserModel = await JsonWebTokenUserModel.get(req);
        const userIdModel = jsonWebTokenUserModel.frontUserIdModel;

        // リクエストモデルに変換
        const createBookshelfMemoRequestModel = new CreateBookshelfMemoRequestModel(requestDto);
        const bookIdModel = new BookIdModel(bookId);

        // 書籍の存在チェック
        const bookshelfList = await this.createBookshelfMemoService.getBookshelfList(
            userIdModel,
            bookIdModel,
        );

        if (!bookshelfList || bookshelfList.length === 0) {
            throw Error(`書籍情報が存在しません。`);
        }

        const tx = new TypeOrmTransaction();

        try {
            // トランザクション開始
            await tx.start();

            // 本棚メモ登録用シーケンス番号を取得
            const memoSeqModel = await this.createBookshelfMemoService.getNestMemoSeq(
                userIdModel,
                bookIdModel
            );

            // 本棚メモに登録
            const bookshelf = await this.createBookshelfMemoService.createBookshelfMemo(
                userIdModel,
                bookIdModel,
                createBookshelfMemoRequestModel,
                memoSeqModel,
            );

            // コミット
            await tx.commit();

            return ApiResponse.create(
                HttpStatus.HTTP_STATUS_OK,
                `メモを登録しました。`,
                bookshelf,
            );
        } catch (e) {

            if (tx.isActive()) {
                tx.rollback();
            }
            throw Error(`メモ登録中にエラーが発生しました。ENDPOINT:${CreateBookshelfMemoController.ENDPOINT} MTTHOD:POST ERROR:${e}`);
        } finally {
            tx.release();
        }
    }
}