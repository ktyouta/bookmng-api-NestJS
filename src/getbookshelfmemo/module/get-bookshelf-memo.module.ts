import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { BookshelfMemoTransaction } from "src/entities/BookshelfMemoTransaction";
import { GetBookshelfMemoController } from "../controller/get-bookshelf-memo.controller";
import { GetBookshelfMemoService } from "../service/get-bookshelf-memo.service";
import { GetBookshelfMemoRepository } from "../repository/get-bookshelf-memo.repository";


@Module({
    controllers: [GetBookshelfMemoController],
    providers: [
        GetBookshelfMemoService,
        GetBookshelfMemoRepository,
    ],
    imports: [
        TypeOrmModule.forFeature([
            BookshelfTransaction,
            BookshelfMemoTransaction
        ]),
    ],
})
export class GetBookshelfMemoModule { }
