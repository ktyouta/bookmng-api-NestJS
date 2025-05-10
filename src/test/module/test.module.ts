import { Module } from "@nestjs/common";
import { TestController } from "../controller/test.controller";
import { TestService } from "../service/test.service";


@Module({
    controllers: [TestController],
    providers: [
        TestService
    ],
})
export class TestModule { }
