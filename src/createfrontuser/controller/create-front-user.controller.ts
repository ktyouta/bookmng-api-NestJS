import { Body, Controller, Get, Post, Query, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from "src/common/api/ApiEndpoint";
import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { HttpStatus } from "src/common/const/HttpStatusConst";
import { ApiResponse } from "src/common/api/ApiResponse";
import { CreateFrontUserService } from "../service/create-front-user.service";
import { CreateFrontUserRequestDto } from "../dto/create-front-user-request.dto";
import { CreateFrontUserRequestModel } from "../model/create-front-user-request.model";
import { TypeOrmTransaction } from "src/common/db/TypeOrmTransaction";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class CreateFrontUserController {

    constructor(private readonly createFrontUserService: CreateFrontUserService,) { }

    @Post(ApiEndopoint.FRONT_USER)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async execute(@Body() requestDto: CreateFrontUserRequestDto) {

        const tx = new TypeOrmTransaction();

        try {
            // ユーザーID発番
            const frontUserIdModel = await FrontUserIdModel.create();

            // トランザクション開始
            await tx.start();

            // リクエストの型変換
            const createFrontUserRequestModel = new CreateFrontUserRequestModel(requestDto);

            // ユーザーの重複チェック
            if (await this.createFrontUserService.isExitstUser(createFrontUserRequestModel)) {
                return ApiResponse.create(HttpStatus.HTTP_STATUS_UNPROCESSABLE_ENTITY, `既にユーザーが存在しています。`);
            }

            // ユーザーログイン情報作成
            await this.createFrontUserService.createUseriLoginInfo(
                frontUserIdModel,
                createFrontUserRequestModel,
            );

            // ユーザーマスタ情報作成
            await this.createFrontUserService.createUserMasterInfo(
                frontUserIdModel,
                createFrontUserRequestModel,
            );

            // コミット
            await tx.commit();

            return ApiResponse.create(
                HttpStatus.HTTP_STATUS_OK,
                `ユーザーの作成に成功しました`,
            );
        } catch (e) {
            tx.rollback();
            throw Error(`ユーザー情報作成中にエラーが発生しました。ERROR:${e}`);
        } finally {
            tx.release();
        }
    }
}