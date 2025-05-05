import { Module } from "@nestjs/common";
import { GetBookDetailService } from "../service/get-book-detail.service";
import { GetBookDetailController } from "../controller/get-book-detail.controller";

@Module({
    controllers: [GetBookDetailController],
    providers: [GetBookDetailService],
})
export class GetBookDetailModule { }
