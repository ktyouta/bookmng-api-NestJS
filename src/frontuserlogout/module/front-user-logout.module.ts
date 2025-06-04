import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { FrontUserInfoMaster } from "src/entities/FrontUserInfoMaster";
import { FrontUserLogoutController } from "../controller/front-user-logout.controller";


@Module({
    controllers: [FrontUserLogoutController],
    providers: [],
    imports: [],
})
export class FrontUserLogoutModule { }
