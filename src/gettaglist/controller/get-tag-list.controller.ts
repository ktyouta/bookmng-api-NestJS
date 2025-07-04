import { Controller, Get, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from "src/common/api/ApiEndpoint";
import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { HttpStatus } from "src/common/const/HttpStatusConst";
import { ApiResponse } from "src/common/api/ApiResponse";
import { JsonWebTokenUserModel } from "src/jsonwebtoken/model/JsonWebTokenUserModel";
import { Request } from 'express';
import { GetTagListService } from "../service/get-tag-list.service";
import { CookieCheckGuard } from "src/guard/cookie-check.guard";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class GetTagListController {

    constructor(private readonly getTagListService: GetTagListService,) { }

    @UseGuards(CookieCheckGuard)
    @Get(ApiEndopoint.TAG_LIST)
    async execute(@Req() req: Request) {

        // jwt認証
        const jsonWebTokenUserModel = await JsonWebTokenUserModel.get(req);
        const userIdModel = jsonWebTokenUserModel.frontUserIdModel;

        // タグリストを取得する
        const tagList = await this.getTagListService.getTagList(userIdModel);

        return ApiResponse.create(
            HttpStatus.HTTP_STATUS_OK,
            `タグリストの取得に成功しました`,
            tagList,
        );
    }
}