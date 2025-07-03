import { Module } from "@nestjs/common";
import { GetBookshelfSortListController } from "../controller/get-bookshelf-sort-list.controller";
import { GetBookshelfSortListService } from "../service/get-bookshelf-sort-list.service";
import { GetBookshelfSortListRepository } from "../repository/get-bookshelf-sort-list.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { ReadStatusMaster } from "src/entities/ReadStatusMaster";
import { BookshelfSortMaster } from "src/entities/BookshelfSortMaster";

@Module({
    controllers: [GetBookshelfSortListController],
    providers: [
        GetBookshelfSortListService,
        GetBookshelfSortListRepository,
    ],
    imports: [
        TypeOrmModule.forFeature([
            BookshelfSortMaster
        ]),
    ],
})
export class GetBookshelfSortListModule { }
