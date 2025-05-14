import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { FrontUserInfoMaster } from "src/entities/FrontUserInfoMaster";
import { CreateBookshelfController } from "../controller/create-bookshelf.controller";
import { CreateBookshelfService } from "../service/create-bookshelf.service";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { CreateBookshelfRepository } from "../repository/create-bookshelf.repository";


@Module({
    controllers: [CreateBookshelfController],
    providers: [
        CreateBookshelfService,
        CreateBookshelfRepository,
    ],
    imports: [
        TypeOrmModule.forFeature([
            BookshelfTransaction
        ]),
    ],
})
export class CreateBookshelfModule { }
