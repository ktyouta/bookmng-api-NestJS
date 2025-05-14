import { Body, Controller, Get, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from "src/common/api/ApiEndpoint";
import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { HttpStatus } from "src/common/const/HttpStatusConst";
import { ApiResponse } from "src/common/api/ApiResponse";
import { TypeOrmTransaction } from "src/common/db/TypeOrmTransaction";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { JsonWebTokenModel } from "src/jsonwebtoken/model/JsonWebTokenModel";
import { Response } from 'express';
import { NewJsonWebTokenModel } from "src/jsonwebtoken/model/NewJsonWebTokenModel";
import { CreateBookshelfService } from "../service/create-bookshelf.service";
import { CreateBookshelfRequestDto } from "../dto/create-bookshelf-request.dto";
import { CookieCheckGuard } from "src/guard/cookie-check.guard";
import { JsonWebTokenUserModel } from "src/jsonwebtoken/model/JsonWebTokenUserModel";
import { Request } from 'express';
import { CreateBookshelfRequestModel } from "../model/create-bookshelf.model";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class CreateBookshelfController {

    // ENDPOINT
    private static readonly ENDPOINT = ApiEndopoint.BOOKSHELF;

    constructor(private readonly createBookshelfService: CreateBookshelfService,) { }

    @UseGuards(CookieCheckGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post(CreateBookshelfController.ENDPOINT)
    async execute(@Body() requestDto: CreateBookshelfRequestDto,
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response) {

        // jwt認証
        const jsonWebTokenUserModel = await JsonWebTokenUserModel.get(req);
        const userIdModel = jsonWebTokenUserModel.frontUserIdModel;

        // リクエストモデルに変換
        const createBookshelfRequestModel = new CreateBookshelfRequestModel(requestDto);

        // 書籍の重複チェック

        const tx = new TypeOrmTransaction();

        try {
            // トランザクション開始
            await tx.start();

            // コミット
            await tx.commit();

            return ApiResponse.create(
                HttpStatus.HTTP_STATUS_OK,
                `本棚に登録しました`,
            );
        } catch (e) {

            if (tx.isActive()) {
                tx.rollback();
            }
            throw Error(`本棚登録中にエラーが発生しました。ENDPOINT:${CreateBookshelfController.ENDPOINT} MTTHOD:POST ERROR:${e}`);
        } finally {
            tx.release();
        }
    }
}