import { Module } from "@nestjs/common";
import { GetBookshelfListController } from "../controller/get-bookshelf-list.controller";
import { GetBookshelfListService } from "../service/get-bookshelf-list.service";
import { GetBookshelfListRepository } from "../repository/get-bookshelf-list.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";

@Module({
    controllers: [GetBookshelfListController],
    providers: [
        GetBookshelfListService,
        GetBookshelfListRepository,
    ],
    imports: [
        TypeOrmModule.forFeature([
            BookshelfTransaction
        ]),
    ],
})
export class GetBookshelfListModule { }
