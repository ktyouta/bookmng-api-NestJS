import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { FrontUserInfoMaster } from "src/entities/FrontUserInfoMaster";
import { CreateBookshelfMemoController } from "../controller/create-bookshelf-memo.controller";
import { CreateBookshelfMemoService } from "../service/create-bookshelf-memo.service";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { CreateBookshelfMemoRepository } from "../repository/create-bookshelf-memo.repository";
import { BookshelfMemoTransaction } from "src/entities/BookshelfMemoTransaction";


@Module({
    controllers: [CreateBookshelfMemoController],
    providers: [
        CreateBookshelfMemoService,
        CreateBookshelfMemoRepository,
    ],
    imports: [
        TypeOrmModule.forFeature([
            BookshelfTransaction,
            BookshelfMemoTransaction
        ]),
    ],
})
export class CreateBookshelfMemoModule { }
