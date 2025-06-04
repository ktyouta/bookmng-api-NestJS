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
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class FrontUserLogoutController {

    constructor() { }

    @Post(ApiEndopoint.FRONT_USER_LOGOUT)
    async execute(@Res({ passthrough: true }) res: Response) {

        // cookieを削除
        res.clearCookie(JsonWebTokenModel.KEY, { httpOnly: true });

        return ApiResponse.create(HttpStatus.HTTP_STATUS_OK, `ログアウトしました。`);
    }
}