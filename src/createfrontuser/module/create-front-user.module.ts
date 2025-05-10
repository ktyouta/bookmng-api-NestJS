import { Module } from "@nestjs/common";
import { CreateFrontUserController } from "../controller/create-front-user.controller";
import { CreateFrontUserService } from "../service/create-front-user.service";
import { CreateFrontUserRepository } from "../repository/create-front-user-repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { FrontUserInfoMaster } from "src/entities/FrontUserInfoMaster";


@Module({
    controllers: [CreateFrontUserController],
    providers: [
        CreateFrontUserService,
        CreateFrontUserRepository
    ],
    imports: [
        TypeOrmModule.forFeature([
            FrontUserLoginMaster,
            FrontUserInfoMaster,
        ]),
    ],
})
export class CreateFrontUserModule { }
