import { Module } from "@nestjs/common";
import { CreateFrontUserController } from "../controller/create-front-user.controller";
import { CreateFrontUserService } from "../service/create-front-user.service";
import { CreateFrontUserRepository } from "../repository/create-front-user-repository";


@Module({
    controllers: [CreateFrontUserController],
    providers: [
        CreateFrontUserService,
        CreateFrontUserRepository
    ],
})
export class CreateFrontUserModule { }
