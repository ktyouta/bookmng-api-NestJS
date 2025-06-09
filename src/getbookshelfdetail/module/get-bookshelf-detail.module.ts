import { Module } from "@nestjs/common";
import { GetBookshelfDetailService } from "../service/get-bookshelf-detail.service";
import { GetBookshelfDetailController } from "../controller/get-bookshelf-detail.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { GetBookshelfDetailRepository } from "../repository/get-bookshelf-detail.repository";

@Module({
    controllers: [GetBookshelfDetailController],
    providers: [
        GetBookshelfDetailService,
        GetBookshelfDetailRepository,
    ],
    imports: [
        TypeOrmModule.forFeature([
            BookshelfTransaction
        ]),
    ],
})
export class GetBookshelfDetailModule { }
