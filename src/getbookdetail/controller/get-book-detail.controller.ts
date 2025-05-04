import { Controller, Get, Param, Query, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from "src/common/api/ApiEndpoint";
import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { HttpStatus } from "src/common/const/HttpStatusConst";
import { ApiResponse } from "src/common/api/ApiResponse";
import { GoogleBooksApiBooksDeitalBookIdModel } from "src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel";
import { GetBookDetailService } from "../service/get-book-detail.service";
import { GetBookDetailResponse } from "../dto/get-book-detail-response.dto";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class GetBookDetailController {

    constructor(private readonly getBookDetailService: GetBookDetailService,) { }

    @Get(ApiEndopoint.BOOK_ID)
    async execute(@Param('id') id: string) {

        const googleBooksApiBooksDeitalBookIdModel = new GoogleBooksApiBooksDeitalBookIdModel(id);

        // Google Books APIから書籍詳細を取得する
        const bookDetailModel = await this.getBookDetailService.getBookDetail(googleBooksApiBooksDeitalBookIdModel);

        // レスポンスの書籍一覧
        const getBookDetailResponse = new GetBookDetailResponse(bookDetailModel);

        return ApiResponse.create(
            HttpStatus.HTTP_STATUS_OK,
            `書籍情報(詳細)の取得に成功しました`,
            getBookDetailResponse.data
        );
    }
}