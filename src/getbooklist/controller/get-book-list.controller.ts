import { Controller, Get, Query, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from "src/common/api/ApiEndpoint";
import { GetBookListService } from "../service/get-book-list.service";
import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { GetBookListResponseDto } from "../dto/get-book-list-response.dto";
import { HttpStatus } from "src/common/const/HttpStatusConst";
import { GetBookListRequestDto } from "../dto/get-book-list-reques.dto";
import { ApiResponse } from "src/common/api/ApiResponse";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class GetBookListController {

    constructor(private readonly getBookListService: GetBookListService,) { }

    @Get(ApiEndopoint.BOOK)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async execute(@Query() requestDto: GetBookListRequestDto) {

        // キーワードを取得
        const keyword = requestDto.q;
        const googleBooksApiBookListKeyword = new GoogleBooksApiBookListKeyword(keyword);

        // Google Books APIから書籍一覧を取得する
        const bookListModel = await this.getBookListService.getBookList(googleBooksApiBookListKeyword);

        // レスポンスの書籍一覧
        const getBookListResponseDto = new GetBookListResponseDto(bookListModel);

        return ApiResponse.create(
            HttpStatus.HTTP_STATUS_OK,
            `書籍情報(一覧)の取得に成功しました`,
            getBookListResponseDto.data
        );
    }
}