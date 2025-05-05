import { Module } from "@nestjs/common";
import { CreateFrontUserController } from "../controller/create-front-user.controller";
import { CreateFrontUserService } from "../service/create-front-user.service";


@Module({
    controllers: [CreateFrontUserController],
    providers: [CreateFrontUserService],
})
export class CreateFrontUserModule { }
