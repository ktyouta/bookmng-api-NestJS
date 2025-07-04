import { Module } from "@nestjs/common";
import { GetTagListController } from "../controller/get-tag-list.controller";
import { GetTagListService } from "../service/get-tag-list.service";
import { GetTagListRepository } from "../repository/get-tag-list.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { ReadStatusMaster } from "src/entities/ReadStatusMaster";
import { BookshelfSortMaster } from "src/entities/BookshelfSortMaster";
import { TagMaster } from "src/entities/TagMaster";

@Module({
    controllers: [GetTagListController],
    providers: [
        GetTagListService,
        GetTagListRepository,
    ],
    imports: [
        TypeOrmModule.forFeature([
            TagMaster
        ]),
    ],
})
export class GetTagListModule { }
