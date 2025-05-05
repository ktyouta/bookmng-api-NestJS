import { Module } from "@nestjs/common";
import { GetBookListService } from "../service/get-book-list.service";
import { GetBookListController } from "../controller/get-book-list.controller";

@Module({
    controllers: [GetBookListController],
    providers: [GetBookListService],
})
export class GetBookListModule { }
