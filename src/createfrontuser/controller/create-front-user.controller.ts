import { Body, Controller, Get, Post, Query, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from "src/common/api/ApiEndpoint";
import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { HttpStatus } from "src/common/const/HttpStatusConst";
import { ApiResponse } from "src/common/api/ApiResponse";
import { CreateFrontUserService } from "../service/create-front-user.service";
import { CreateFrontUserRequestDto } from "../dto/create-front-user-request.dto";
import { CreateFrontUserRequestModel } from "../model/create-front-user-request.model";
import { TypeOrmTransaction } from "src/common/db/TypeOrmTransaction";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { JsonWebTokenModel } from "src/jsonwebtoken/model/JsonWebTokenModel";
import { Response } from 'express';
import { NewJsonWebTokenModel } from "src/jsonwebtoken/model/NewJsonWebTokenModel";
import { CreateFrontUserResponseModel } from "../model/create-front-user-response.model";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class CreateFrontUserController {

    constructor(private readonly createFrontUserService: CreateFrontUserService,) { }

    @Post(ApiEndopoint.FRONT_USER)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async execute(@Body() requestDto: CreateFrontUserRequestDto,
        @Res({ passthrough: true }) res: Response) {

        // リクエストの型変換
        const createFrontUserRequestModel = new CreateFrontUserRequestModel(requestDto);

        // ユーザーの重複チェック
        const isExitst = await this.createFrontUserService.isExitstUser(createFrontUserRequestModel);

        if (isExitst) {
            return ApiResponse.create(HttpStatus.HTTP_STATUS_UNPROCESSABLE_ENTITY, `既にユーザーが存在しています。`);
        }

        // ユーザーID発番
        const frontUserIdModel = await FrontUserIdModel.create();

        const tx = new TypeOrmTransaction();

        try {
            // トランザクション開始
            await tx.start();

            // ユーザーログイン情報作成
            await this.createFrontUserService.createUseriLoginInfo(
                frontUserIdModel,
                createFrontUserRequestModel,
            );

            // ユーザーマスタ情報作成
            const frontUserInfo = await this.createFrontUserService.createUserMasterInfo(
                frontUserIdModel,
                createFrontUserRequestModel,
            );

            // jwtを作成
            const newJsonWebTokenModel =
                await this.createFrontUserService.createJsonWebToken(frontUserIdModel, createFrontUserRequestModel);

            // レスポンス
            const createFrontUserResponseModel = new CreateFrontUserResponseModel(frontUserInfo);

            // cookieを返却
            res.cookie(JsonWebTokenModel.KEY, newJsonWebTokenModel.token, NewJsonWebTokenModel.COOKIE_OPTION);

            // コミット
            await tx.commit();

            return ApiResponse.create(
                HttpStatus.HTTP_STATUS_OK,
                `ユーザーの作成に成功しました`,
                createFrontUserResponseModel,
            );
        } catch (e) {

            if (tx.isActive()) {
                tx.rollback();
            }
            throw Error(`ユーザー情報作成中にエラーが発生しました。ENDPOINT:${ApiEndopoint.FRONT_USER} MTTHOD:POST ERROR:${e}`);
        } finally {
            tx.release();
        }
    }
}