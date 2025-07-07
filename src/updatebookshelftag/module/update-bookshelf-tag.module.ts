import { Module } from "@nestjs/common";
import { UpdateBookshelfTagController } from "../controller/update-bookshelf-tag.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { BookshelfTagTransaction } from "src/entities/BookshelfTagTransaction";
import { UpdateBookshelfTagService } from "../service/update-bookshelf-tag.service";
import { UpdateBookshelfTagRepository } from "../repository/update-bookshelf-tag.repository";
import { TagMaster } from "src/entities/TagMaster";


@Module({
    controllers: [UpdateBookshelfTagController],
    providers: [
        UpdateBookshelfTagService,
        UpdateBookshelfTagRepository,
    ],
    imports: [
        TypeOrmModule.forFeature([
            BookshelfTransaction,
            BookshelfTagTransaction,
            TagMaster,
        ]),
    ],
})
export class UpdateBookshelfTagModule { }
