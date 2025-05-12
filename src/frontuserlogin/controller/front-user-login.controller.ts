import { Body, Controller, Get, Post, Query, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from "src/common/api/ApiEndpoint";
import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { HttpStatus } from "src/common/const/HttpStatusConst";
import { ApiResponse } from "src/common/api/ApiResponse";
import { TypeOrmTransaction } from "src/common/db/TypeOrmTransaction";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { JsonWebTokenModel } from "src/jsonwebtoken/model/JsonWebTokenModel";
import { Response } from 'express';
import { NewJsonWebTokenModel } from "src/jsonwebtoken/model/NewJsonWebTokenModel";
import { FrontUserLoginRequestDto } from "../dto/front-user-login-request.dto";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserLoginService } from "../service/front-user-login.service";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";
import { ERR_MESSAGE_FAILURE_REQUEST } from "../const/front-user-login.const";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class FrontUserLoginController {

    constructor(private readonly frontUserLoginService: FrontUserLoginService,) { }

    @Post(ApiEndopoint.FRONT_USER_LOGIN)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async execute(@Body() requestDto: FrontUserLoginRequestDto,
        @Res({ passthrough: true }) res: Response) {

        // ユーザ名
        const frontUserNameModel = new FrontUserNameModel(requestDto.userName);

        // ログインユーザー取得
        const frontUserLoginList = await this.frontUserLoginService.getLoginUser(frontUserNameModel);

        if (!frontUserLoginList || frontUserLoginList.length === 0) {
            return ApiResponse.create(HttpStatus.HTTP_STATUS_UNPROCESSABLE_ENTITY, ERR_MESSAGE_FAILURE_REQUEST);
        }

        const userLoginInfo = frontUserLoginList[0];
        const saltValueModel = FrontUserSaltValueModel.reConstruct(userLoginInfo.salt);
        const password = userLoginInfo.password;
        const inputPasswordModel = FrontUserPasswordModel.hash(requestDto.password, saltValueModel);

        // パスワードチェック
        if (inputPasswordModel.frontUserPassword !== password) {
            return ApiResponse.create(HttpStatus.HTTP_STATUS_UNPROCESSABLE_ENTITY, ERR_MESSAGE_FAILURE_REQUEST);
        }

        return ApiResponse.create(
            HttpStatus.HTTP_STATUS_OK,
            `ログインに成功しました`,
        );
    }
}