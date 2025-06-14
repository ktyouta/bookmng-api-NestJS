import { Module } from "@nestjs/common";
import { UpdateBookshelfReviewController } from "../controller/update-bookshelf-review.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { UpdateBookshelfReviewService } from "../service/update-bookshelf-review.service";
import { UpdateBookshelfReviewRepository } from "../repository/update-bookshelf-review.repository";

@Module({
    controllers: [UpdateBookshelfReviewController],
    providers: [
        UpdateBookshelfReviewService,
        UpdateBookshelfReviewRepository,
    ],
    imports: [
        TypeOrmModule.forFeature([
            BookshelfTransaction
        ]),
    ],
})
export class UpdateBookshelfReviewModule { }
