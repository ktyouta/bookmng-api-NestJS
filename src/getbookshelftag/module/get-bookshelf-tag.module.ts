import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { BookshelfTagTransaction } from "src/entities/BookshelfTagTransaction";
import { GetBookshelfTagController } from "../controller/get-bookshelf-tag.controller";
import { GetBookshelfTagService } from "../service/get-bookshelf-tag.service";
import { GetBookshelfTagRepository } from "../repository/get-bookshelf-tag.repository";


@Module({
    controllers: [GetBookshelfTagController],
    providers: [
        GetBookshelfTagService,
        GetBookshelfTagRepository,
    ],
    imports: [
        TypeOrmModule.forFeature([
            BookshelfTransaction,
            BookshelfTagTransaction
        ]),
    ],
})
export class GetBookshelfTagModule { }
