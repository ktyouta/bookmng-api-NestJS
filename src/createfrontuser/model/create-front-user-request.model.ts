import { FrontUserBirthdayModel } from "src/internal/frontuserinfomaster/FrontUserBirthdayModel";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { CreateFrontUserRequestDto } from "../dto/create-front-user-request.dto";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";

export class CreateFrontUserRequestModel {

    // ユーザー名
    private readonly _frontUserNameModel: FrontUserNameModel;
    // パスワード
    private readonly _frontUserPasswordModel: FrontUserPasswordModel;
    // 生年月日
    private readonly _frontUserBirthdayModel: FrontUserBirthdayModel;

    constructor(createFrontUserRequestDto: CreateFrontUserRequestDto) {

        // ソルト値生成
        const salt = FrontUserSaltValueModel.generate();

        this._frontUserNameModel = new FrontUserNameModel(createFrontUserRequestDto.userName);
        this._frontUserPasswordModel = FrontUserPasswordModel.hash(createFrontUserRequestDto.password, salt);
        this._frontUserBirthdayModel = new FrontUserBirthdayModel(createFrontUserRequestDto.birthday);
    }

    get frontUserNameModel() {
        return this.frontUserNameModel;
    }

    get frontUserPasswordModel() {
        return this._frontUserPasswordModel;
    }

    get frontUserBirthdayModel() {
        return this._frontUserBirthdayModel;
    }
}