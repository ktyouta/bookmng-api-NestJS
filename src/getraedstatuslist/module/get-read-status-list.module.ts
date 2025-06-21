import { Module } from "@nestjs/common";
import { GetReadStatusListController } from "../controller/get-read-status-list.controller";
import { GetReadStatusListService } from "../service/get-read-status-list.service";
import { GetReadStatusListRepository } from "../repository/get-read-status-list.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { ReadStatusMaster } from "src/entities/ReadStatusMaster";

@Module({
    controllers: [GetReadStatusListController],
    providers: [
        GetReadStatusListService,
        GetReadStatusListRepository,
    ],
    imports: [
        TypeOrmModule.forFeature([
            ReadStatusMaster
        ]),
    ],
})
export class GetReadStatusListModule { }
