import { Module } from "@nestjs/common";
import { UpdateBookshelfStatusController } from "../controller/update-bookshelf-status.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { UpdateBookshelfStatusRepository } from "../repository/update-bookshelf-status.repository";
import { UpdateBookshelfStatusService } from "../service/update-bookshelf-status.service";


@Module({
    controllers: [UpdateBookshelfStatusController],
    providers: [
        UpdateBookshelfStatusService,
        UpdateBookshelfStatusRepository,
    ],
    imports: [
        TypeOrmModule.forFeature([
            BookshelfTransaction
        ]),
    ],
})
export class UpdateBookshelfStatusModule { }
