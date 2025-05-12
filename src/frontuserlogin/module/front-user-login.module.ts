import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { FrontUserInfoMaster } from "src/entities/FrontUserInfoMaster";
import { FrontUserLoginController } from "../controller/front-user-login.controller";
import { FrontUserLoginService } from "../service/front-user-login.service";
import { FrontUserLoginRepository } from "../repository/front-user-login.repository";


@Module({
    controllers: [FrontUserLoginController],
    providers: [
        FrontUserLoginService,
        FrontUserLoginRepository,
    ],
    imports: [
        TypeOrmModule.forFeature([
            FrontUserLoginMaster,
            FrontUserInfoMaster,
        ]),
    ],
})
export class FrontUserLoginModule { }
