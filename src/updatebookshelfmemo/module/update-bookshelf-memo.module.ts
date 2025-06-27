import { Module } from "@nestjs/common";
import { UpdateBookshelfMemoController } from "../controller/update-bookshelf-memo.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { UpdateBookshelfMemoRepository } from "../repository/update-bookshelf-memo.repository";
import { UpdateBookshelfMemoService } from "../service/update-bookshelf-memo.service";
import { BookshelfMemoTransaction } from "src/entities/BookshelfMemoTransaction";


@Module({
    controllers: [UpdateBookshelfMemoController],
    providers: [
        UpdateBookshelfMemoService,
        UpdateBookshelfMemoRepository,
    ],
    imports: [
        TypeOrmModule.forFeature([
            BookshelfTransaction,
            BookshelfMemoTransaction
        ]),
    ],
})
export class UpdateBookshelfMemoModule { }
