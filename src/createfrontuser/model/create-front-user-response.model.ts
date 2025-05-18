import { FrontUserBirthdayModel } from "src/internal/frontuserinfomaster/FrontUserBirthdayModel";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { CreateFrontUserRequestDto } from "../dto/create-front-user-request.dto";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";
import { FrontUserInfoMaster } from "src/entities/FrontUserInfoMaster";

export class CreateFrontUserResponseModel {

    // ユーザー名
    private readonly userName: string;
    // 生年月日
    private readonly bithday: string;

    constructor(frontUserInfoMaster: FrontUserInfoMaster) {

        // ソルト値生成
        const salt = FrontUserSaltValueModel.generate();

        this.userName = frontUserInfoMaster.userName;
        this.bithday = frontUserInfoMaster.userBirthday;
    }
}