import { Controller, Get, Post, Query, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from "src/common/api/ApiEndpoint";
import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { HttpStatus } from "src/common/const/HttpStatusConst";
import { ApiResponse } from "src/common/api/ApiResponse";
import { CreateFrontUserService } from "../service/create-front-user.service";
import { CreateFrontUserRequestDto } from "../dto/create-front-user-request.dto";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class CreateFrontUserController {

    constructor(private readonly createFrontUserService: CreateFrontUserService,) { }

    @Post(ApiEndopoint.FRONT_USER)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async execute(@Query() requestDto: CreateFrontUserRequestDto) {



        return ApiResponse.create(
            HttpStatus.HTTP_STATUS_OK,
            `ユーザーの作成に成功しました`,
        );
    }
}