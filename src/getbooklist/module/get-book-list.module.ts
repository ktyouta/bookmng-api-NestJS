import { Module } from "@nestjs/common";
import { GetBookListService } from "../service/get-book-list.service";
import { GetBookListController } from "../controller/get-book-list.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { GetBookListRepository } from "../repository/get-book-list.repository";

@Module({
    controllers: [GetBookListController],
    providers: [
        GetBookListService,
        GetBookListRepository
    ],
    imports: [
        TypeOrmModule.forFeature([
            BookshelfTransaction
        ]),
    ],
})
export class GetBookListModule { }
