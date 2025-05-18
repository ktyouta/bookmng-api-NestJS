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
import { CookieCheckGuard } from "src/guard/cookie-check.guard";
import { JsonWebTokenUserModel } from "src/jsonwebtoken/model/JsonWebTokenUserModel";
import { Request } from 'express';


@Controller(BOOKMNG_ENDPOINT_PATH)
export class FrontUserCheckAuthController {

    // ENDPOINT
    private static readonly ENDPOINT = ApiEndopoint.FRONT_USER_CHECK_AUTH;

    @UseGuards(CookieCheckGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post(FrontUserCheckAuthController.ENDPOINT)
    async execute(@Req() req: Request,
        @Res({ passthrough: true }) res: Response) {

        // jwt認証
        const jsonWebTokenUserModel = await JsonWebTokenUserModel.get(req);
        const userIdModel = jsonWebTokenUserModel.frontUserIdModel;
        const passwordModel = jsonWebTokenUserModel.frontUserPasswordModel;

        // jwtを作成
        const newJsonWebTokenModel = new NewJsonWebTokenModel(userIdModel, passwordModel);

        // cookieを返却
        res.cookie(JsonWebTokenModel.KEY, newJsonWebTokenModel.token, NewJsonWebTokenModel.COOKIE_OPTION);

        return ApiResponse.create(
            HttpStatus.HTTP_STATUS_OK,
            `認証に成功しました`,
            newJsonWebTokenModel.token,
        );
    }
}