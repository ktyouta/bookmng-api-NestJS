import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { FrontUserInfoMaster } from "src/entities/FrontUserInfoMaster";
import { FrontUserCheckAuthController } from "../controller/front-user-check-auth.controller";


@Module({
    controllers: [FrontUserCheckAuthController],
    providers: [],
})
export class FrontUserCheckAuthModule { }
