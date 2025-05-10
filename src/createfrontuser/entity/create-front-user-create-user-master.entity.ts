import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { FrontUserBirthdayModel } from "src/internal/frontuserinfomaster/FrontUserBirthdayModel";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";

export class CreateFrontUserCreateUserMasterEntity {

    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;
    // ユーザー名
    private readonly _frontUserNameModel: FrontUserNameModel;
    // 生年月日
    private readonly _birthdayModel: FrontUserBirthdayModel;

    constructor(userId: FrontUserIdModel,
        frontUserNameModel: FrontUserNameModel,
        birthdayModel: FrontUserBirthdayModel
    ) {

        this._frontUserIdModel = userId;
        this._frontUserNameModel = frontUserNameModel;
        this._birthdayModel = birthdayModel;
    }

    public get frontUserIdModel() {
        return this._frontUserIdModel;
    }

    public get birthdayModel() {
        return this._birthdayModel;
    }

    public get frontUserId() {
        return this._frontUserIdModel.frontUserId;
    }

    public get frontUserName() {
        return this._frontUserNameModel.frontUserName;
    }

    public get frontUserBirthDay() {
        return this._birthdayModel.frontUserBirthDay;
    }
}