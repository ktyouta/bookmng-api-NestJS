import { Module } from "@nestjs/common";
import { UpdateBookshelfSummaryService } from "../service/update-bookshelf-summary.service";
import { UpdateBookshelfSummaryController } from "../controller/update-bookshelf-summary.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { UpdateBookshelfSummaryRepository } from "../repository/update-bookshelf-summary.repository";

@Module({
    controllers: [UpdateBookshelfSummaryController],
    providers: [
        UpdateBookshelfSummaryService,
        UpdateBookshelfSummaryRepository,
    ],
    imports: [
        TypeOrmModule.forFeature([
            BookshelfTransaction
        ]),
    ],
})
export class UpdateBookshelfSummaryModule { }
