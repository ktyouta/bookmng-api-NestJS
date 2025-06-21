import { Controller, Get, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from "src/common/api/ApiEndpoint";
import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { HttpStatus } from "src/common/const/HttpStatusConst";
import { ApiResponse } from "src/common/api/ApiResponse";
import { JsonWebTokenUserModel } from "src/jsonwebtoken/model/JsonWebTokenUserModel";
import { Request } from 'express';
import { GetReadStatusListService } from "../service/get-read-status-list.service";
import { GetReadStatusListRequestDto } from "../dto/get-read-status-list-request.dto";
import { CookieCheckGuard } from "src/guard/cookie-check.guard";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class GetReadStatusListController {

    constructor(private readonly getReadStatusListService: GetReadStatusListService,) { }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Get(ApiEndopoint.READ_STATUS)
    async execute() {

        // 読書状況一覧を取得する
        const readStatusList = await this.getReadStatusListService.getReadStatusList();

        return ApiResponse.create(
            HttpStatus.HTTP_STATUS_OK,
            `読書状況一覧の取得に成功しました`,
            readStatusList,
        );
    }
}