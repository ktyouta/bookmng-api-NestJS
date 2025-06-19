import { Module } from "@nestjs/common";
import { GetBookDetailService } from "../service/get-book-detail.service";
import { GetBookDetailController } from "../controller/get-book-detail.controller";
import { GetBookDetailRepository } from "../repository/get-book-detail.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";

@Module({
    controllers: [GetBookDetailController],
    providers: [
        GetBookDetailService,
        GetBookDetailRepository,
    ],
    imports: [
        TypeOrmModule.forFeature([
            BookshelfTransaction
        ]),
    ],
})
export class GetBookDetailModule { }
