import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { BookshelfMemoTransaction } from "src/entities/BookshelfMemoTransaction";
import { DeleteBookshelfMemoController } from "../controller/delete-bookshelf-memo.controller";
import { DeleteBookshelfMemoService } from "../service/delete-bookshelf-memo.service";
import { DeleteBookshelfMemoRepository } from "../repository/delete-bookshelf-memo.repository";


@Module({
    controllers: [DeleteBookshelfMemoController],
    providers: [
        DeleteBookshelfMemoService,
        DeleteBookshelfMemoRepository,
    ],
    imports: [
        TypeOrmModule.forFeature([
            BookshelfTransaction,
            BookshelfMemoTransaction
        ]),
    ],
})
export class DeleteBookshelfMemoModule { }
