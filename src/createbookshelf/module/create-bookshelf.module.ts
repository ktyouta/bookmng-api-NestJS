import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { FrontUserInfoMaster } from "src/entities/FrontUserInfoMaster";
import { CreateBookshelfController } from "../controller/create-bookshelf.controller";
import { CreateBookshelfService } from "../service/create-bookshelf.service";


@Module({
    controllers: [CreateBookshelfController],
    providers: [
        CreateBookshelfService
    ],
    imports: [
        TypeOrmModule.forFeature([

        ]),
    ],
})
export class CreateBookshelfModule { }
