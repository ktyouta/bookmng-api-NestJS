import { Body, Controller, Get, Param, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from "src/common/api/ApiEndpoint";
import { GoogleBooksApiBookListKeyword } from "src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword";
import { HttpStatus } from "src/common/const/HttpStatusConst";
import { ApiResponse } from "src/common/api/ApiResponse";
import { GoogleBooksApiBooksDeitalBookIdModel } from "src/external/googlebooksapi/bookdetail/properties/GoogleBooksApiBooksDeitalBookIdModel";
import { CookieCheckGuard } from "src/guard/cookie-check.guard";
import { JsonWebTokenUserModel } from "src/jsonwebtoken/model/JsonWebTokenUserModel";
import { Request } from 'express';
import { UpdateBookshelfReviewService } from "../service/update-bookshelf-review.service";
import { UpdateBookshelfReviewRequestDto } from "../dto/update-bookshelf-review-request.dto";
import { ReviewModel } from "../model/review.model";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";
import { TypeOrmTransaction } from "src/common/db/TypeOrmTransaction";


@Controller(BOOKMNG_ENDPOINT_PATH)
export class UpdateBookshelfReviewController {

    private static readonly ENDPOINT = ApiEndopoint.BOOKSHELF_REVIEW;

    constructor(private readonly pdateBookshelfReviewService: UpdateBookshelfReviewService,) { }

    @UseGuards(CookieCheckGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Put(UpdateBookshelfReviewController.ENDPOINT)
    async execute(@Param('bookId') bookId: string,
        @Body() requestDto: UpdateBookshelfReviewRequestDto,
        @Req() req: Request,) {

        // jwt認証
        const jsonWebTokenUserModel = await JsonWebTokenUserModel.get(req);
        const userIdModel = jsonWebTokenUserModel.frontUserIdModel;

        const bookIdModel = new BookIdModel(bookId);
        const reviewModel = new ReviewModel(requestDto);

        const tx = new TypeOrmTransaction();

        try {

            // トランザクション開始
            await tx.start();

            // レビューを更新
            const result = await this.pdateBookshelfReviewService.updateReview(
                userIdModel,
                bookIdModel,
                reviewModel,
            );

            const updateCount = result.affected;

            if (!updateCount || updateCount === 0) {
                throw Error(`レビューの更新に失敗しました。`);
            }

            return ApiResponse.create(
                HttpStatus.HTTP_STATUS_OK,
                `レビューの更新に成功しました`,
                reviewModel.review
            );

        } catch (e) {
            if (tx.isActive()) {
                tx.rollback();
            }
            throw Error(`レビュー更新中にエラーが発生しました。ENDPOINT:${UpdateBookshelfReviewController.ENDPOINT} MTTHOD:PUT ERROR:${e}`);
        } finally {
            tx.release();
        }
    }
}